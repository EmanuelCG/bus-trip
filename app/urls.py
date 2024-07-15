from django.urls import path
from .views import BusView, PassengerView, LocationView, JourneyView, DriverView

urlpatterns = [
    #BUS URLS
    path('bus/', BusView.list_bus, name="buses"),
    path('bus/edit-bus/<int:bus_id>/', BusView.edit_bus, name="edit-bus"),
    path('bus/create-bus/', BusView.create_bus, name="create-bus"),
    path('bus/delete-bus/<int:bus_id>/', BusView.delete_bus, name="delete-bus"),
    
    #PASSENGER URLS
    path('passenger/', PassengerView.list_passenger, name="passengers"),
    path('passenger/edit-passenger/<int:id>/', PassengerView.edit_passenger, name="edit-passenger"),
    path('passenger/create-passenger/', PassengerView.create_passenger, name="create-passenger"),
    path('passenger/delete-passenger/<int:id>/', PassengerView.delete_passenger, name="delete-passenger"),

    #LOCATION URLS
    path('location/', LocationView.list_location, name="locations"),
    path('location/edit-location/<int:location_id>/', LocationView.edit_location, name="edit-location"),
    path('location/create-location/', LocationView.create_location, name="create-location"),
    path('location/delete-location/<int:location_id>/', LocationView.delete_location, name="delete-location"),

    #JOURNEY URLS
    path('journey/', JourneyView.list_journey, name="journeys"),
    path('journey/edit-journey/<int:journey_id>/', JourneyView.edit_journey, name="edit-journey"),
    path('journey/create-journey/', JourneyView.create_journey, name="create-journey"),
    path('journey/delete-journey/<int:journey_id>/', JourneyView.delete_journey, name="delete-journey"),

    #DRIVER URLS
    path('driver/', DriverView.list_driver, name="drivers"),
    path('driver/edit-driver/<int:driver_id>/', DriverView.edit_driver, name="edit-driver"),
    path('driver/create-driver/', DriverView.create_driver, name="create-driver"),
    path('driver/delete-driver/<int:driver_id>/', DriverView.delete_driver, name="delete-driver"),
]