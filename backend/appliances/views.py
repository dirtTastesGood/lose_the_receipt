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

from users.authentication import SafeJWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Appliance


@api_view(['GET'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def appliance_list(request):

    appliances = Appliance.objects.all()

    return Response(data=appliances)
