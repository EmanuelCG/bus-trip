from rest_framework import serializers
from .models.ticket import Ticket
from .models.bus import Bus
from .models.passenger import Passenger
from .models.journey import Journey
from .models.driver import Driver
from .models.location import Location
from .models.journey_driver import JourneyDriver


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
    class Meta:
        model = Journey
        fields = ['id', 'duration_in_seconds', 'location_id_origin', 'location_id_destination','location_origin_name', 'location_destination_name','is_active']
        read_only_fields = ['create_at', 'updated_at']

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
    class Meta:
        model = JourneyDriver
        fields = ['id','datetime_start', 'state','journey', 'driver', 'formatted_update_at', 'driver_document', 'journey_description', 'formatted_datetime_start']
        read_only_fields = ['create_at', 'updated_at']

    def get_state_choices(self, obj):
        return JourneyDriver.get_state_choices()
    
    def get_journey_description(self, obj):
        return obj.get_journey_description()
