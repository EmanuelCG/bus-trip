from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import JourneyDriverSerializer
from ..models.journey_driver import JourneyDriver

@api_view(['GET'])
def list_jourey_driver(request):
    journey_driver = JourneyDriver.objects.all()
    serializer = JourneyDriverSerializer(journey_driver, many=True)
    response_data = {
        "data": serializer.data,
        "state_choices": JourneyDriver.get_state_choices() 
    }
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_journey_driver(request):
    print(request.data) 
    seriallizer = JourneyDriverSerializer(data=request.data)
    if seriallizer.is_valid():
        print("Data is valid")
        try:
            instance = seriallizer.save()
            print("Instance created:", instance)
            return Response(seriallizer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Error saving instance:", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        print("Data is invalid", seriallizer.errors)
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
def delete_journey_driver(request, id):
    try:
        obj = JourneyDriver.objects.get(pk=id)
    except JourneyDriver.DoesNotExist:
        return Response({'error': 'This object not exits'}, status=status.HTTP_404_NOT_FOUND)
    obj_deleted = obj
    obj.delete()
    return Response({'res':f'This object {obj_deleted} deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



