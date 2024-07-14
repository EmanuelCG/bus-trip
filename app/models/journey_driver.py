from django.db import models
from .driver import Driver
from .journey import Journey

class JourneyDriver(models.Model):
    class State(models.TextChoices):
        PLANNED = 'PL', 'Planned'
        ONGOING = 'OG', 'Ongoing'
        COMPLETED = 'CO', 'Completed'
        CANCELLED = 'CA', 'Cancelled'
        DELAYED = 'DE', 'Delayed'

    datetime_start = models.DateTimeField(null=False)
    state = models.CharField(max_length=2, choices=State.choices, default=State.PLANNED)    
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, null=False)
    journay = models.ForeignKey(Journey, on_delete=models.CASCADE, null=False)
    
    #create
    #driver_change
    # state_change
    #find_one




