from rest_framework import serializers
from .models.ticket import Ticket
from .models.bus import Bus
from .models.passenger import Passenger
from .models.journey import Journey
from .models.driver import Driver
from .models.location import Location
from .models.journey_driver import JourneyDriver
from .models.seat import Seat

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'plate', 'color', 'brand', 'model', 'serial', 'year', 'is_active', 'formatted_update_at']
        read_only_fields = ['id', 'create_at', 'updated_at']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'is_active', 'formatted_update_at', 'formatted_create_at']
        read_only_fields = ['id', 'create_at', 'updated_at']


class JourneySerializer(serializers.ModelSerializer):
    location_origin_name = serializers.CharField(source='location_id_origin.name', read_only=True)
    location_destination_name = serializers.CharField(source='location_id_destination.name', read_only=True)
    description = serializers.SerializerMethodField()
    class Meta:
        model = Journey
        fields = ['id', 'duration_in_seconds', 'location_id_origin', 'location_id_destination','location_origin_name', 'location_destination_name','is_active', 'description']
        read_only_fields = ['create_at', 'updated_at']
    
    def get_description(self, obj):
        return str(obj)

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['id', 'document', 'names', 'last_names', 'date_of_birthday', 'is_whitelist', 'formatted_update_at']
        read_only_fields = ['create_at', 'updated_at', 'formatted_update_at']

class DriverSerializer(serializers.ModelSerializer):
    bus_plate = serializers.CharField(source='bus.plate', read_only=True)
    assignment_status = serializers.SerializerMethodField()
    class Meta:
        model = Driver
        fields = ['id', 'document', 'names', 'last_names', 'date_of_birthday', 'is_active', 'formatted_update_at', 'bus', 'bus_plate', 'assignment_status']
        read_only_fields = ['create_at', 'updated_at', 'formatted_update_at']
    
    def get_assignment_status(self, obj):
        return "assigned" if JourneyDriver.objects.filter(driver = obj).exists() else "unassigned"
        
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['states']
        read_only_fields = ['create_at', 'updated_at', 'passenger', 'journey_driver', 'seat']

class JourneyDriverSerializer(serializers.ModelSerializer):
    driver_document = serializers.CharField(source='driver.document', read_only=True)
    journey_description  = serializers.SerializerMethodField()
    sold_capacity = serializers.SerializerMethodField()
    total_seats  = serializers.SerializerMethodField()
    occupancy_percentage = serializers.SerializerMethodField()
    class Meta:
        model = JourneyDriver
        fields = ['id','datetime_start', 'state','journey', 'driver', 'formatted_update_at', 'driver_document', 'journey_description', 'formatted_datetime_start', 'sold_capacity', 'total_seats', 'occupancy_percentage']
        read_only_fields = ['create_at', 'updated_at']

    def get_state_choices(self, obj):
        return JourneyDriver.get_state_choices()
    
    def get_journey_description(self, obj):
        return obj.get_journey_description()
    
    def get_sold_capacity(self, obj):
        #Obtenemos el diccionarios de asientos ocupaodos por bus
        seat_stats = JourneyDriver.calculate_seat_statics(obj.journey.id)
        #Obtenemos el bus del conductor asociando
        bus_id = obj.driver.bus.id if obj.driver and obj.driver.bus else None
        #Retomamos el numero de asientos ocupados por ese bus, o 0 si no hay datos
        return seat_stats.get(bus_id, {}).get('occupied_seats',0)
    
    def get_total_seats(self, obj):
        seat_stats = JourneyDriver.calculate_seat_statics(obj.journey.id)
        bus_id = obj.driver.bus.id if obj.driver and obj.driver.bus else None
        #Retomamos el numero de asientos ocupados por ese bus, o 0 si no hay datos
        return seat_stats.get(bus_id, {}).get('total_seats', 0)
    
    def get_occupancy_percentage(self, obj):
        seat_stats = JourneyDriver.calculate_seat_statics(obj.journey.id)
        bus_id = obj.driver.bus.id if obj.driver and obj.driver.bus else None
        return seat_stats.get(bus_id,{}).get('occupancy_percentage', 0)

class SeatSerializer(serializers.ModelSerializer):
    bus_plate = serializers.CharField(source="bus.plate", read_only=True)
    class Meta:
        model = Seat
        fields = ['id', 'seat_number', 'bus', 'status','create_at', 'updated_at', 'bus_plate', 'formatted_update_at']
        read_only_fields = ['id', 'create_at', 'updated_at']

