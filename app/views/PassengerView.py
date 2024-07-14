from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.passenger import Passenger
from ..serializers import PassengerSerializer

@api_view(['GET'])
def list_passenger(request):
    if request.method == "GET":
        passengers = Passenger.objects.all()
        serializer = PassengerSerializer(passengers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_passenger(request):
    serializer = PassengerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_passenger(request, id):
    try:
        if request.method == "PUT":
            passenger = Passenger.objects.get(pk = id)
            serializer = PassengerSerializer(passenger, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except Passenger.DoesNotExist:
        return Response({'error': 'Passenger not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_passenger(request, id):
    try:
        passenger = Passenger.objects.get(pk = id)
    except Passenger.DoesNotExist:
        Response({'message': 'This passanger not exits'}, status=status.HTTP_404_NOT_FOUND)
    passenger_id = id
    passenger.delete()
    return Response({'message': f'This passenger {passenger_id} delete successfully'}, status=status.HTTP_200_OK)
