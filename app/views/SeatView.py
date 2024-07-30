from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models.seat import Seat
from ..serializers import SeatSerializer


@api_view(['GET'])
def list_seat(request):
    seats = Seat.objects.all()
    serializer = SeatSerializer(seats, many=True)
    if serializer:
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_one_seat(request, seat_id):
    seat = get_object_or_404(Seat, pk=seat_id)
    if seat:
        serializer = SeatSerializer(seat)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Seat not exists'}, status=status.HTTP_404_NOT_FOUND)

        
@api_view(['POST'])
def create_seat(request):
    serializer = SeatSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_seat(request, seat_id):
    seat = get_object_or_404(Seat, pk=id)
    serializer = SeatSerializer(Seat, data=seat)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_seat(request, seat_id):
    seat = get_object_or_404(Seat, pk=id)
    if seat:
        seat_delete = seat
        seat.delete()
        return Response({'msj':f'The seat{seat_delete} deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({'error': 'This seat not exists in database'}, status=status.HTTP_204_NO_CONTENT)
        

