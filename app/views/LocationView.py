from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import LocationSerializer
from ..models.location import Location
from rest_framework import status

@api_view(['GET'])
def list_location(request):
    locations = Location.objects.all()
    serializer = LocationSerializer(locations, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
def create_location(request):
    serializer = LocationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['PUT'])
def edit_location(request, location_id):
    try:
        location = Location.objects.get(pk = location_id)
    except Location.DoesNotExist:
        return Response({f'Location {location} not exits'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = LocationSerializer(location, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_location(request, location_id):
    try:
        location = Location.objects.get(pk = location_id)
    except Location.DoesNotExist:
        Response({f'This location id not exits'}, status=status.HTTP_400_BAD_REQUEST)
    location_deleted = location.name
    location.delete()
    return Response({'response': f'Location {location_deleted} delete succesfully'}, status=status.HTTP_204_NO_CONTENT)
