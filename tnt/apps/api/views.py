from django.shortcuts import render

# TNT imports
from tnt.spatial_functions_defs import spatial_fns

# Django rest framework imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.reverse import reverse

# Create your views here.
@api_view(('GET',))
def api_root(request, format=None):

    return Response({
        'spatial_functions': \
        reverse('api:spatial_functions', \
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