from django.contrib import admin
from .models import Trayecto

class TrayectoAdmin(admin.ModelAdmin):
    list_display = ["nombre", "bus", "horario", "get_chofer"]    

admin.site.register(Trayecto, TrayectoAdmin)

