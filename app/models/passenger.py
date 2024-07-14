from django.db import models
from ..utils import formatted_date
class Passenger(models.Model):
    document = models.CharField(max_length=10, unique=True)
    names = models.CharField(max_length=155, null=False)
    last_names = models.CharField(max_length=155, null=False)
    date_of_birthday = models.DateField(null=False)
    is_whitelist = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def formatted_update_at(self):
        return formatted_date(self.updated_at)

