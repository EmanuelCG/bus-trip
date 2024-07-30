from django.urls import path
from .views import BusView, PassengerView, LocationView, JourneyView, DriverView, JourneyDriverView, SeatView

urlpatterns = [
    #BUS URLS
    path('bus/', BusView.list_bus, name="buses"),
    path('bus/available/buses/', BusView.get_available_buses, name="available-buses"),
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
    path('journey/<int:journey_id>/', JourneyView.get_one_journey, name="journey"),
    path('journey/edit-journey/<int:journey_id>/', JourneyView.edit_journey, name="edit-journey"),
    path('journey/create-journey/', JourneyView.create_journey, name="create-journey"),
    path('journey/delete-journey/<int:journey_id>/', JourneyView.delete_journey, name="delete-journey"),

    #DRIVER URLS
    path('driver/', DriverView.list_driver, name="drivers"),
    path('driver/<int:driver_id>/', DriverView.get_one_driver, name="driver"),
    path('driver/avariable/drivers/', DriverView.get_available_drivers, name="avariable-driver"),
    path('driver/edit-driver/<int:driver_id>/', DriverView.edit_driver, name="edit-driver"),
    path('driver/create-driver/', DriverView.create_driver, name="create-driver"),
    path('driver/delete-driver/<int:driver_id>/', DriverView.delete_driver, name="delete-driver"),
    
    #JOURNEY DRIVER URLS
    path('journey-driver/', JourneyDriverView.list_jourey_driver, name="journey-driver"),
    path('journey-driver/edit/<int:id>/', JourneyDriverView.edit_journey_driver, name="edit-journey-driver"),
    path('journey-driver/create/', JourneyDriverView.create_journey_driver, name="create-journey-driver"),
    path('journey-driver/delete/<int:id>/', JourneyDriverView.delete_journey_driver, name="delete-journey-driver"),

    #SEAT URLS
    path('seat/', SeatView.list_seat, name="seat"),
    path('seat/<int:seat_id>/', SeatView.get_one_seat, name="seat"),
    path('seat/edit/<int:seat_id>/', SeatView.edit_seat, name="edit-seat"),
    path('seat/create/', SeatView.create_seat, name="create-seat"),
    path('seat/delete/<int:seat_id>/', SeatView.delete_seat, name="delete-seat"),
]