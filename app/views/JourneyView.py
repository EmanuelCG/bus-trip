from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.journey import Journey
from ..serializers import JourneySerializer

@api_view(['GET'])
def list_journey(request):
    try:
        journeys = Journey.objects.all()
        serializer = JourneySerializer(journeys, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_one_journey(request, journey_id):
    journey = Journey.objects.get(pk=journey_id)
    if journey:
        serializer = JourneySerializer(journey)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Journey not exists'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_journey(request):
    serializer = JourneySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_journey(request, journey_id):
    try:
        journey = Journey.objects.get(pk=journey_id)
    except Journey.DoesNotExist:
        return Response({'error': 'This journey does not exists'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = JourneySerializer(instance=journey, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_journey(request, journey_id):
    try:
        journey = Journey.objects.get(pk = journey_id)
    except Journey.DoesNotExist:
        return Response({'error': 'This journey does not exists'}, status=status.HTTP_404_NOT_FOUND)
    journey_deleted = journey
    journey.delete()
    return Response({'response': f'{journey_deleted}'},status=status.HTTP_204_NO_CONTENT)
    
