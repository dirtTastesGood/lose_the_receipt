from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view, 
    authentication_classes,
    permission_classes
)
from rest_framework.authentication import (
    BasicAuthentication,
    TokenAuthentication
)
from rest_framework.permissions import IsAuthenticated

from .models import Appliance


@api_view(['GET'])
@authentication_classes([BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def appliance_list(request):
    appliances=Appliance.objects.all()

    return Response(data=appliances)


