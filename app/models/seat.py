from django.db import models
from .bus import Bus

class Seat(models.Model):
    seat_number = models.CharField(max_length=2)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
