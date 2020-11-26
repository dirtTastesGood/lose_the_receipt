from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.accessory_list),
    # path('<slug:slug>', views.accessory_detail)
]
