from django.db import models
from bus.models import Bus
from horario.models import Horario
from chofer.models import Chofer

class Trayecto(models.Model):
    nombre = models.CharField(max_length= 200)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    horario = models.ForeignKey(Horario, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.get_full_trayecto()
    
    def get_chofer(self):
        try:
            chofer = Chofer.objects.get(bus = self.bus)
            return chofer
        except Chofer.DoesNotExist:
            return "Chofer no asignado"
    
    def get_full_trayecto(self):
        return f"{self.nombre} - {self.horario}" 
    
    get_chofer.short_description = "Chofer"