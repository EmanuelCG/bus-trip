from django.db import models

class Driver(models.Model):
    document = models.CharField(max_length=10, unique=True)
    names = models.CharField(max_length=155, null=False)
    last_names = models.CharField(max_length=155, null=False)
    date_of_birthday = models.DateTimeField(null=False)
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)