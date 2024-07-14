from django.db import models
from ..utils import formatted_date
class Location(models.Model):
    name = models.CharField(max_length=155)
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def formatted_update_at(self):
        return formatted_date(self.updated_at)
    @property
    def formatted_create_at(self):
        return formatted_date(self.create_at)
    