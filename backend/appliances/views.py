from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Appliance

# class ApplianceViewSet(viewsets.ViewSet):

@api_view(['GET'])
def appliance_list(request):
    appliances=Appliance.objects.all()

    return Response(data=appliances)


