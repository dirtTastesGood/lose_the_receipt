from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import login, logout

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)

from .serializers import ApplianceSerializer

from users.authentication import SafeJWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Appliance


@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def appliance_list(request):
    '''GET: Return a list of appliances owned by the current user\n
    POST: Add an item to a user's list of appliances'''
    response = Response()

    if request.method == 'GET':
        appliances = Appliance.objects.filter(owner=request.user.id)

        appliances_serializer = ApplianceSerializer(appliances, many=True)

        response.data = {'appliances': appliances_serializer.data}
        return response

    elif request.method == 'POST':
        response.data = 'Hello world'
        return response


@api_view(['POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def add_appliance(request):

    return Response(data="Yo Yo!")
