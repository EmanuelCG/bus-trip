from django.db import models
from .location import Location

class Journey(models.Model):
    duration_in_seconds = models.IntegerField()
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location_id_origin = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='journey_origin')
    location_id_destination = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='journey_destination')

    def __str__(self):
        return f'Journey {self.location_id_origin.name} - {self.location_id_destination.name}'
    
    