from django.db import models
from django.contrib import admin

class Bus(models.Model):
    plate = models.CharField(max_length=10, unique=True)
    color = models.CharField(max_length=50, null=False)
    brand = models.CharField(max_length=50, null=False)
    model = models.CharField(max_length=50)
    serial = models.CharField(max_length=50, unique=True)
    year = models.CharField(max_length=4)
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @admin.display(description="Updated Date")
    def formatted_update_at(self):
        return self.updated_at.strftime('%d/%m/%Y %H:%M')