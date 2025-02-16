from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.bus import Bus
from ..models.driver import Driver
from ..serializers import BusSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(method='get', response={200:BusSerializer(many=True)})
@api_view(['GET'])
def list_bus(request):
    if request.method == "GET":
        buses = Bus.objects.all()
        serializer = BusSerializer(buses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_available_buses(request):
     assigned_buses = Driver.objects.filter(bus__isnull=False).values_list('bus_id', flat=True)
     available_buses = Bus.objects.exclude(id__in = assigned_buses)
     serializer = BusSerializer(available_buses, many=True)
     return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_bus_id(request, id):
     try:
        bus = Bus.objects.get(pk = id)
        serializer = BusSerializer(bus)
        return Response(serializer.data, status=status.HTTP_200_OK)
     except Bus.DoesNotExist:
          return Response({"error": "Bus not found"}, status=status.HTTP_404_NOT_FOUND)
     
@api_view(['POST'])
def create_bus(request):
    if request.method == "POST":
        serializer = BusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_bus(request, bus_id):
        try:
            bus = Bus.objects.get(pk = bus_id)
        except Bus.DoesNotExist:
             return Response({'msj': 'This bus {bus.id} not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = BusSerializer(bus, data=request.data, partial=True)
        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=status.HTTP_200_OK)
        else:
             return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)
        
@api_view(['DELETE'])
def delete_bus(request, bus_id):
    try:
        bus = Bus.objects.get(pk = bus_id)
    except Bus.DoesNotExist:
         return Response({'msj': 'This bus {bus.id} not found'}, status=status.HTTP_404_NOT_FOUND)
    bus_id = bus.id
    bus.delete()
    return Response({'msj': f'This bus {bus_id} is delete'}, status=status.HTTP_200_OK)