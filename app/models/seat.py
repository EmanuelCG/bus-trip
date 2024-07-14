from django.db import models

class Seat(models.Model):
    seat_x = models.IntegerField()
    seat_y = models.CharField(max_length=1)
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    