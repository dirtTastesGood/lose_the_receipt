from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_list),
    path('login/', views.login),
    path('auth/', views.get_auth_user),
    path('refresh_token/', views.refresh_token),
    path('<int:pk>/', views.user_detail),
    path('new/', views.user_create),
    path('edit/<int:pk>', views.user_edit),
]
