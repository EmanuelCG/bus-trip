from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import JourneyDriverSerializer
from ..models.journey_driver import JourneyDriver

@api_view(['GET'])
def list_jourey_driver(request):
    journey_driver = JourneyDriver.objects.all()
    serializer = JourneyDriverSerializer(journey_driver, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_journey_driver(request):
    seriallizer = JourneyDriverSerializer(data=request.data)
    if seriallizer.is_valid():
        return Response(seriallizer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(seriallizer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_journey_driver(request, id):
    try:
        obj = JourneyDriver.objects.get(pk=id)
    except JourneyDriver.DoesNotExist:
        return Response({'error': 'This object not exits'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = JourneyDriverSerializer(instance=JourneyDriver, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_journey_driver(id):
    try:
        obj = JourneyDriver.objects.get(pk=id)
    except JourneyDriver.DoesNotExist:
        return Response({'error': 'This object not exits'}, status=status.HTTP_404_NOT_FOUND)
    obj_deleted = obj
    obj.delete()
    return Response({'res':f'This object {obj_deleted} deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



