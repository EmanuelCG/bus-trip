from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.driver import Driver
from ..serializers import DriverSerializer

@api_view(['GET'])
def list_drivers(request):
    
