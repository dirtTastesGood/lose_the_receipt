from django.contrib import admin
from django.urls import path

# from .views import UserList, UserProfile
from . import views
urlpatterns = [
    path('', views.user_list),
    path('<int:pk>/', views.user_detail),
    path('new/', views.user_create),
    path('edit/<int:pk>', views.user_edit),
]
