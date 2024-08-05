from django.db import models
from .passenger import Passenger
from .journey_driver import JourneyDriver
from .seat import Seat

class Ticket(models.Model):
    class State(models.TextChoices):
        ISSUED = 'IS', 'Issued'
        CANCELLED = 'CA', 'Cancelled'
    states = models.CharField(max_length=2, choices=State.choices)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    journey_driver = models.OneToOneField(JourneyDriver, on_delete=models.CASCADE)
    seat = models.OneToOneField(Seat, on_delete=models.CASCADE, default='')


