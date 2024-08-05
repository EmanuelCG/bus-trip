from django.db import models
from .driver import Driver
from .journey import Journey
from ..utils import formatted_date
from .bus import Bus
from .seat import Seat
class JourneyDriver(models.Model):
    class State(models.TextChoices):
        PLANNED = 'PL', 'Planned'
        ONGOING = 'OG', 'Ongoing'
        COMPLETED = 'CO', 'Completed'
        CANCELLED = 'CA', 'Cancelled'
        DELAYED = 'DE', 'Delayed'

    datetime_start = models.DateTimeField()
    state = models.CharField(max_length=2, choices=State.choices, default=State.PLANNED)    
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, null=False)
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE, null= False)

    @classmethod
    def get_state_choices(cls):
        return cls.State.choices
    
    @property
    def formatted_update_at(self):
        return formatted_date(self.updated_at)
    
    @property
    def formatted_datetime_start(self):
        return formatted_date(self.updated_at)
    
    def get_journey_description(self):
        return str(self.journey)

    @classmethod
    def calculate_seat_statics(cls, journey_id):
        drivers = JourneyDriver.objects.filter(journey=journey_id).values_list('driver_id', flat=True)
        buses = Bus.objects.filter(driver__id__in=drivers)
        total_seats = Seat.objects.filter(bus__id__in=buses).values('bus_id').annotate(total_seats=models.Count('id'))
        seats_occupied = Seat.objects.filter(bus__id__in=buses, status=False).values('bus_id').annotate(seats_occupied=models.Count('id'))

        seat_count = {seat['bus_id']: seat['total_seats'] for seat in total_seats}
        seat_occupied_count = {seat['bus_id']: seat['seats_occupied'] for seat in seats_occupied}

        bus_seat_statistics = {}

        for bus_id in seat_count:
            seats = seat_count[bus_id] 
            seats_occupied = seat_occupied_count.get(bus_id,0)
            occupancy_percentage = (seats_occupied / seats) * 100 if seats > 0 else 0
            bus_seat_statistics[bus_id] = {
                'total_seats': seats,
                'occupied_seats': seats_occupied,
                'occupancy_percentage': occupancy_percentage
            }
    
        return bus_seat_statistics






