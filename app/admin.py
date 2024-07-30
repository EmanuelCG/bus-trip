from django.contrib import admin
from .models.bus import Bus
from .models.driver import Driver
from .models.journey import Journey
from .models.journey_driver import JourneyDriver
from .models.location import Location
from .models.passenger import Passenger
from .models.ticket import Ticket
from . models.seat import Seat


admin.site.register(Bus)
admin.site.register(Driver)
admin.site.register(Journey)
admin.site.register(JourneyDriver)
admin.site.register(Location)
admin.site.register(Passenger)
admin.site.register(Ticket)
admin.site.register(Seat)