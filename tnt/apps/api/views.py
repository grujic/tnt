import os
import urllib
import json
import uuid
import datetime
import time
import requests

import glob

from tnt.settings import \
    bose_base_url, \
    json_results_relative_dir, \
    BASE_DIR, \
    MEDIA_ROOT

from django.shortcuts import render

# TNT imports
from tnt.spatial_and_temporal_functions_defs import fns
from tnt import operator_defs
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

        'spatial_and_temporal_functions': \
        reverse('api:spatial_and_temporal_functions', \
        request=request, \
        format=format),

		'operators': \
        reverse('api:operators', \
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

        #'delete_calculation': \
        #reverse('api:delete_calculation', \
        #request=request, \
        #format=format),

        #'rename_calculation': \
        #reverse('api:rename_calculation', \
        #request=request, \
        #format=format),

        ### START OF API CALLS FOR info on calculations ###

        ### END OF API CALLS FOR info on calculations ###

    })

### START OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

@api_view(['GET'])
def spatial_and_temporal_functions(request):
    """
    Return a list of the allowed spatial and temporal dependences of operators
    """

    response = Response({'fns': fns}, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def operators(request):
    """
    Return a list of the available Hamiltonian operators.
    """

    response = Response({'operators': operator_defs.operators}, status=status.HTTP_200_OK)    # R1gt

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

        calculation_id = running_calculation.id

        print("Checking on status of running calculation with ID " + running_calculation.id + "...")

        # Assemble a URL to query for the results of this calculation if they exist
        request_url = bose_base_url + '/api/v1.0/calculation/results/' + running_calculation.id

        print("Requesting info from " + request_url)

        # Get the response from Bose
        resp = requests.get(request_url)

        # Check the status code - if it's 200 then there's data inside, i.e. calculation has finished and results are saved on Bose
        if resp.status_code == 500:     # There's been an error
            running_calculation.status = 'error'

            setup = json.loads(running_calculation.setup)
            setup['meta_info']['status'] = 'error'

            running_calculation.setup = json.dumps(setup)

            # We've updated the status of the calculation - now resave it!
            running_calculation.save()

        elif resp.status_code == 200:

            json_save_filename = BASE_DIR + json_results_relative_dir + running_calculation.id + '.json'

            print("Writing JSON results for calculation to file " + json_save_filename + "...")

            open(json_save_filename, 'w').write(resp.content)

            print("Wrote JSON results for calculation to file " + json_save_filename)

            running_calculation.status = 'finished'

            # Annoying and clunky but also have to update the status in the JSON representation of the calculations
            setup = json.loads(running_calculation.setup)
            setup['meta_info']['status'] = 'finished'

            setup['meta_info']['finished'] = json.loads(resp.content)['finish_time']

            running_calculation.setup = json.dumps(setup)

            # We've updated the status of the calculation - now resave it!
            running_calculation.save()

            # Now save the images to the MEDIA ROOT

            results = json.loads(resp.content)

            expectation_plot_urls = results['expectation_value_plots']

            print("We have to fetch the following URLs: " + ', \n'.join(expectation_plot_urls))

            for expectation_plot_url in expectation_plot_urls:

                print("Fetching image for calculation results at " + expectation_plot_url)

                filename = expectation_plot_url.split('/')[-1]

                print("Save filename for this image is " + filename)

                save_directory = MEDIA_ROOT + calculation_id + '/'

                print("Save directory = " + save_directory)

                if not os.path.exists(save_directory):
                    print("Creating directory " + save_directory)
                    os.makedirs(save_directory)

                save_filename = save_directory + filename

                print("Saving to " + save_filename)

                urllib.urlretrieve(expectation_plot_url, save_filename)

            # Now fetch the MAT results
            print results
            mat_results_url = results['mat_results_URL']
            print("Fetching MAT results for calculation results at " + expectation_plot_url)
            filename = mat_results_url.split('/')[-1]
            save_directory = MEDIA_ROOT + calculation_id + '/'
            save_filename = save_directory + filename
            print("Saving to " + save_filename)
            urllib.urlretrieve(mat_results_url, save_filename)

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
def get_expectation_img_urls(request, calculation_id):
    """
    The URLs at which we will find expectation value images
    """
    expectation_value_filenames = glob.glob(MEDIA_ROOT + calculation_id + "/*")
    expectation_value_urls = [{'url': '/media/' + calculation_id + '/' + filename.split('/')[-1]} for filename in expectation_value_filenames]

    response = Response({ \
      'url_data': expectation_value_urls \
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
def rename_calculation(request, calculation_id, new_name):
    """
    Rename calculation with the given ID ###
    """
    try:
        calc = Calculation.objects.filter(id=calculation_id)[0]
        calc.name = new_name
        # Annoyingly have to do this too, modify the JSON:
        setup = json.loads(calc.setup)
        setup['meta_info']['name'] = new_name
        calc.setup = json.dumps(setup)
        calc.save()
        response = Response('OK', status=status.HTTP_200_OK)    # R1gt
    except:
        response = Response('Not found', status=status.HTTP_404_NOT_FOUND)    # R1gt

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

    print("meta_info:")
    print calculation['meta_info']

    # Deal with the name that the user has provided, or not
    if calculation['meta_info']['name'] in [None, '']:
        calculation['meta_info']['name'] = calculation_id   # Default to the calculation ID if nothing explicitly input

    calculation['meta_info']['status'] = 'saved'

    date_created = datetime.datetime.now()
    time_created = int(time.time())

    calculation['meta_info']['date_created'] = time_created

    calculation_obj = Calculation(id=calculation_id, \
                                  name=calculation['meta_info']['name'], \
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
