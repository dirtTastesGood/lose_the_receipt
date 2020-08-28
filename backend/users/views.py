from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import (
    api_view, permission_classes,
    authentication_classes
)
from rest_framework.authentication import (
    TokenAuthentication,
    BasicAuthentication
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import User
from .serializers import UserCreateSerializer, UserDetailSerializer


@api_view(['GET'])
@authentication_classes([TokenAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = User.objects.all()
    serializer = UserDetailSerializer(users, many=True)

    return Response(data=serializer.data)


@api_view(['GET'])
def user_detail(request, pk):
    user = get_object_or_404(get_user_model(), pk=pk)
    serializer = UserDetailSerializer(user, many=False)

    return Response(data=serializer.data)


@api_view(['GET', 'POST'])
def user_create(request):
    new_user_serializer = UserCreateSerializer(
        data=request.data
    )

    if new_user_serializer.is_valid():
        new_user = new_user_serializer.save()

        # create an auth Token for the user
        Token.objects.create(user=new_user)

        return Response(new_user_serializer.data, status=status.HTTP_201_CREATED)

    return Response(new_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_edit(request, pk):

    if request.method == 'GET':
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserCreateSerializer(user, many=False)

        return Response(data=serializer.data)

    elif request.method == 'POST':

        serializer = UserSerializer(
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()

            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
