from django.db import models
from .driver import Driver
from .journey import Journey
from ..utils import formatted_date
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
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE, null=False)

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




