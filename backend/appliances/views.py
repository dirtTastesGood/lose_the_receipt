import datetime
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import login, logout, get_user_model
from django.utils.text import slugify

from rest_framework import status, pagination
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
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
        paginator = pagination.PageNumberPagination()
        paginator.page_size_query_param = 'per_page'
        paginator.page_query_param = 'page'
        appliances = Appliance.objects.filter(owner=request.user.id)
        appliance_page = paginator.paginate_queryset(appliances, request)

        appliances_serializer = ApplianceDetailSerializer(
            appliance_page, many=True)

        return paginator.get_paginated_response(appliances_serializer.data)

    elif request.method == 'POST':

        new_appliance_serializer = ApplianceCreateSerializer(data=request.data)

        # generate slug
        brand = request.data.get('brand')
        appliance_type = request.data.get('appliance_type')
        location = request.data.get('location')

        new_appliance_serializer.initial_data['slug'] = slugify(
            f'{brand} {appliance_type} {location}')

        # print(new_appliance_serializer.is_valid())

        if new_appliance_serializer.is_valid():

            owner = get_user_model().objects.filter(pk=request.user.id).first()

            new_appliance = new_appliance_serializer.save(owner=owner)

            response.data = {
                'appliance': new_appliance_serializer.validated_data}
            response.status_code = status.HTTP_201_CREATED

        else:
            response.data = {'msg': new_appliance_serializer.errors}
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

    if request.method == 'GET':
        serialized_appliance = ApplianceDetailSerializer(appliance)
        response.data = {"appliance": serialized_appliance.data}

    elif request.method == 'PUT':

        print('slug', slug)
        print('request data', request.data)

        serialized_appliance = ApplianceCreateSerializer(
            appliance,
            data=request.data,
        )

        serialized_appliance.initial_data['slug'] = slug

        print('serialized_appliance', serialized_appliance)
        updated_appliance = serialized_appliance
        if updated_appliance.is_valid():
            updated_appliance.save(owner=user)

            response.data = {
                'appliance': updated_appliance.validated_data,
                'msg': ['Appliance updated!']
            }
        else:
            print('ERROR', serialized_appliance.errors)
            response.data = {
                'msg': serialized_appliance.errors,
                'appliance': serialized_appliance.data
            }
            response.status_code = status.HTTP_400_BAD_REQUEST

    return response
