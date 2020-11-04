import datetime
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import login, logout, get_user_model

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)

from .serializers import ApplianceDetailSerializer, ApplianceCreateSerializer

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

        appliances_serializer = ApplianceDetailSerializer(
            appliances, many=True)

        response.data = {'appliances': appliances_serializer.data}
        return response

    elif request.method == 'POST':

        new_appliance_serializer = ApplianceCreateSerializer(data=request.data)

        # print(new_appliance_serializer.is_valid())

        if new_appliance_serializer.is_valid():

            owner = get_user_model().objects.filter(pk=request.user.id).first()

            new_appliance = new_appliance_serializer.save(owner=owner)

            response.data = {
                'appliance': new_appliance_serializer.validated_data}
            response.status_code = status.HTTP_201_CREATED

        else:
            response.data = new_appliance_serializer.errors
            response.status_code = status.HTTP_400_BAD_REQUEST

        return response


@api_view(['GET', 'PUT'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def appliance_detail(request, slug):
    response = Response()
    user = get_user_model().objects.get(id=request.user.id)

    # handle user not found?

    appliance = Appliance.objects.filter(owner=user.id, slug=slug).first()

    if appliance is None:
        response.data = {'msg': ['Appliance not found']}
        response.status_code = status.HTTP_404_NOT_FOUND
        return response

    serialized_appliance = ApplianceDetailSerializer(appliance)

    if request.method == 'GET':
        response.data = {"appliance": serialized_appliance.data}

    if request.method == 'PUT':
        ...

    return response
