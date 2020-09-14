# import jwt
from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import status
from rest_framework import exceptions
from rest_framework.decorators import (
    api_view, permission_classes,
    authentication_classes
)
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .utils import generate_access_token, generate_refresh_token

from .models import User
from .serializers import UserCreateSerializer, UserDetailSerializer


@api_view(['GET'])
@authentication_classes([])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = User.objects.all()
    serializer = UserDetailSerializer(users, many=True)

    return Response(data=serializer.data)


@api_view(['GET'])
@authentication_classes([])
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

@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login(request):

    email = request.data.get('email')
    password = request.data.get('password')
    response = Response()

    if email is None or password is None:
        pass
        # return Response(
        #     data={'msg':'Email and password required.'},
        #     status=status.HTTP_400_BAD_REQUEST
        # )

    try:
        user = User.objects.get(email=email)
    
    except User.DoesNotExist:
        response.data = {
            'msg':'Incorrect email or password'
        }
        response.status_code = status.HTTP_400_BAD_REQUEST
        return response

    serialized_user = UserDetailSerializer(user).data
    
    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    response.set_cookie(key='refresh_token',value=refresh_token,httponly=True,domain='localhost')
    response.data = {
        'user':serialized_user,
        'access_token': access_token
    }
    response.status_code = status.HTTP_200_OK
    return response
    