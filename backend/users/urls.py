from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views

# from .views import UserList, UserProfile
from . import views
urlpatterns = [
    path('', views.user_list),
    path('/login', auth_views.LogoutView.as_view()),
    path('/logout', auth_views.LogoutView.as_view()),
    path('<int:pk>/', views.user_detail),
    path('new/', views.user_create),
    path('edit/<int:pk>', views.user_edit),
]
