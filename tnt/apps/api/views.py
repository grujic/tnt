from django.shortcuts import render

# TNT imports
from tnt.spatial_functions_defs import spatial_fns
from tnt.hamiltonnian_operator_defs import operators
from tnt.blank_calculation import blank_calculation_template

# Django rest framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.reverse import reverse

# Create your views here.
@api_view(('GET',))
def api_root(request, format=None):
	# The API 'root' providing info on available data sources

    return Response({
        
        'spatial_functions': \
        reverse('api:spatial_functions', \
        request=request, \
        format=format),

		'hamiltonian_operators': \
        reverse('api:hamiltonian_operators', \
        request=request, \
        format=format),

    })

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

    response = Response({'operators': operators}, status=status.HTTP_200_OK)    # R1gt

    return response

@api_view(['GET'])
def blank_calculation(request):
    """
    Return an example of a blank calculation, i.e. a JSON structure with all field names present but nothing filled out. 
    Functions as a template for new calculations. 
    """
    response = Response(blank_calculation_template, status=status.HTTP_200_OK)    # R1gt

    return response