from django.contrib import admin
from django.urls import path

from rest_framework_simplejwt.views import (
    token_obtain_pair,
    token_refresh
)

from . import views
urlpatterns = [
    path('', views.user_list),
    path('login/', token_obtain_pair),
    path('<int:pk>/', views.user_detail),
    path('new/', views.user_create),
    path('edit/<int:pk>', views.user_edit),
]
