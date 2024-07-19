from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.driver import Driver
from ..models.journey_driver import JourneyDriver
from ..serializers import DriverSerializer

@api_view(['GET'])
def list_driver(request):
    try:
        drivers = Driver.objects.all()
        serializer = DriverSerializer(drivers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_one_driver(request, driver_id):
    driver = Driver.objects.get(pk=driver_id)
    if driver:
        serializer = DriverSerializer(driver)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': f'Driver id={driver_id} not exists'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_available_drivers(request):
    assigned_drivers = JourneyDriver.objects.values_list('driver_id', flat=True)
    available_drivers = Driver.objects.exclude(id__in=assigned_drivers)
    serializer = DriverSerializer(available_drivers, many=True)
    if serializer:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error:' 'Not found list drivers'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_driver(request):
    serializer = DriverSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_driver(request, driver_id):
    try:
        driver = Driver.objects.get(pk=driver_id)
    except Driver.DoesNotExist:
        return Response({'error', 'Driver does not exits'}, status=status.HTTP_404_NOT_FOUND)
    serializer = DriverSerializer(instance=driver, data=request.data, partial=True)
    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_driver(request, driver_id):
    try:
        driver = Driver.objects.get(pk=driver_id)
    except Driver.DoesNotExist:
        return Response({'error', 'Driver does not exits'}, status=status.HTTP_404_NOT_FOUND)
    driver_deleted = driver
    driver.delete()
    return Response({f'Driver {driver_deleted} is deleted succesfully'}, status=status.HTTP_204_NO_CONTENT)