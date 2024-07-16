from django.db import models
from ..utils import formatted_date
from ..models.bus import Bus
class Driver(models.Model):
    document = models.CharField(max_length=10, unique=True)
    names = models.CharField(max_length=155, null=False)
    last_names = models.CharField(max_length=155, null=False)
    date_of_birthday = models.DateField(null=False)
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bus = models.OneToOneField(Bus, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.names} {self.last_names}'
    
    def formatted_update_at(self):
        return formatted_date(self.updated_at)