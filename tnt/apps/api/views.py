import json
import uuid
import datetime
import time
import requests

from tnt.settings import \
    bose_base_url, \
    json_results_relative_dir, \
    BASE_DIR

from django.shortcuts import render

# TNT imports
from tnt.spatial_functions_defs import spatial_fns
from tnt import hamiltonnian_operator_defs
from tnt import expectation_value_operator_defs
from tnt.blank_calculation import blank_calculation_template

from tnt.initial_base_states import initial_base_states_list
from tnt.initial_state_modifiers import initial_state_modifiers_list

# Django rest framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.reverse import reverse

from tnt.apps.api.models import Calculation

# Create your views here.
@api_view(('GET',))
def api_root(request, format=None):
	# The API 'root' providing info on available data sources

    return Response({
        
        ### START OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

        'spatial_functions': \
        reverse('api:spatial_functions', \
        request=request, \
        format=format),

		'hamiltonian_operators': \
        reverse('api:hamiltonian_operators', \
        request=request, \
        format=format),

		'expectation_operators': \
        reverse('api:expectation_operators', \
        request=request, \
        format=format),

        'blank_calculation': \
        reverse('api:blank_calculation', \
        request=request, \
        format=format),

        'initial_base_states': \
        reverse('api:initial_base_states', \
        request=request, \
        format=format),

        'initial_state_modifiers': \
        reverse('api:initial_state_modifiers', \
        request=request, \
        format=format),

        ### END OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

        'save_calculation': \
        reverse('api:save_calculation', \
        request=request, \
        format=format),

        ### START OF API CALLS FOR info on calculations ###

        ### END OF API CALLS FOR info on calculations ###

    })

### START OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

@api_view(['GET'])
def spatial_functions(request):
    """
    Return a list of the allowed spatial dependences of operators
    """

    response = Response({'spatial_fns': spatial_fns}, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def hamiltonian_operators(request):
    """
    Return a list of the available Hamiltonian operators. 
    """

    response = Response({'operators': hamiltonnian_operator_defs.operators}, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def expectation_operators(request):
    """
    Return a list of the available Hamiltonian operators. 
    """

    response = Response({'operators': expectation_value_operator_defs.operators}, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def blank_calculation(request):
    """
    Return an example of a blank calculation, i.e. a JSON structure with all field names present but nothing filled out. 
    Functions as a template for new calculations. 
    """
    response = Response(blank_calculation_template, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def initial_base_states(request):
    """
    Return a list of available initial base states
    """
    response = Response({'states': initial_base_states_list}, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def initial_state_modifiers(request):
    """
    Return a list of available modifiers to initial base states
    """
    response = Response(initial_state_modifiers_list, status=status.HTTP_200_OK)    # R1gt

    return response

### END OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

### START OF API CALLS FOR info on calculations ###

# Helper functions
def check_on_running_calculations(user_id):
    # We find the calculations of the User that have status 'running' and see if they're finished yet
    running_calculations = Calculation.objects.filter(user_id=user_id, status='running')

    for running_calculation in running_calculations:

        print("Checking on status of running calculation with ID " + running_calculation.id + "...")

        # Assemble a URL to query for the results of this calculation if they exist
        request_url = bose_base_url + '/api/v1.0/calculation/results/' + running_calculation.id

        print("Requesting info from " + request_url)

        # Get the response from Bose
        resp = requests.get(request_url)

        # Check the status code - if it's 200 then there's data inside, i.e. calculation has finished and results are saved on Bose
        if resp.status_code == 200:

            json_save_filename = BASE_DIR + json_results_relative_dir + running_calculation.id + '.json'

            print("Writing JSON results for calculation to file " + json_save_filename + "...")

            open(json_save_filename, 'w').write(resp.content)

            print("Wrote JSON results for calculation to file " + json_save_filename)

            running_calculation.status = 'finished'

            # Annoying and clunky but also have to update the status in the JSON representation of the calculations
            setup = json.loads(running_calculation.setup)
            setup['meta_info']['status'] = 'finished'

            running_calculation.setup = json.dumps(setup)

            # We've updated the status of the calculation - now resave it!
            running_calculation.save()

@api_view(['GET'])
def calculations(request):
    """
    Return JSON representations for all this users' calculations ###
    """

    check_on_running_calculations(request.user.id)

    response = Response({ \
      'calculations': [json.loads(calculation.setup) for calculation in Calculation.objects.filter(user_id=request.user.id)] \
      }, \
      status=status.HTTP_200_OK)

    return response

@api_view(['GET'])
def show_calculation(request, calculation_id):
    """
    Return JSON representation of a stored calculation ###
    """

    print("calculation_id = ")
    print(calculation_id)

    calculation = Calculation.objects.filter(id=calculation_id)

    if len(calculation) > 0:
        response = Response({'calculation': json.loads(calculation[0].setup)}, status=status.HTTP_200_OK)
    else:
        response = Response('Not found', status=status.HTTP_404_NOT_FOUND)

    return response

@api_view(['POST'])
def delete_calculation(request, calculation_id):
    """
    Delete calculation with the given ID ###
    """
    try:
        Calculation.objects.filter(id=calculation_id).delete()
        response = Response('OK', status=status.HTTP_200_OK)    # R1gt
    except:
        response = Response('Not found', status=status.HTTP_404_NOT_FOUND)    # R1gt

    return response

@api_view(['POST'])
def save_calculation(request):
    """
    Save calculation which is POSTed to this URL ###
    """

    calculation_json = request.DATA.get('calculation')
    if calculation_json is not None:
        calculation = json.loads(calculation_json)

    calculation_id = str(uuid.uuid4())
    calculation['meta_info']['id'] = calculation_id

    calculation['meta_info']['status'] = 'saved'

    date_created = datetime.datetime.now()
    time_created = int(time.time())

    calculation['meta_info']['date_created'] = time_created

    calculation_obj = Calculation(id=calculation_id, \
                                  user_id=request.user.id, \
                                  time_created=date_created, \
                                  status='saved', \
                                  setup=json.dumps(calculation))

    calculation_obj.save()

    response = Response('OK', status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['POST'])
def run_calculation(request):
    """
    Run calculation which is POST'ed to this URL and we POST it to the bose server's API ###
    """

    calculation_id = request.DATA.get('calculation_id')

    print calculation_id

    calculation_obj = Calculation.objects.filter(id=calculation_id)[0]

    print calculation_obj

    print calculation_obj.setup

    calculation = json.loads(calculation_obj.setup)

    print calculation

    # Make a call posting this to the BOSE server
    bose_run_url = bose_base_url + '/api/v1.0/calculation/run'

    resp = requests.post(bose_run_url, data={'calculation': json.dumps(calculation)})

    print("Bose response: ")

    print(resp.content)

    calculation_obj.time_run = datetime.datetime.now()

    calculation_obj.status = 'running'

    calculation['meta_info']['date_run'] = int(time.time())

    calculation['meta_info']['status'] = 'running'

    calculation_obj.setup = json.dumps(calculation)

    calculation_obj.save()

    response = Response('OK', status=status.HTTP_200_OK)    # R1gt

    return response

### END OF API CALLS FOR info on calculations ###