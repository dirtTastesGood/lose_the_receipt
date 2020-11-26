from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.appliance_list),
    path('<slug:slug>', views.appliance_detail),
    path('<slug:slug>/accessories/', include('accessories.urls')),
]
