from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.appliance_list),
    path('add/', views.add_appliance)
]
