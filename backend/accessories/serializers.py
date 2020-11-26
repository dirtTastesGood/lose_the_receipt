from rest_framework import serializers
from .models import Accessory


class AccessoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accessory
        fields = '__all__'


class AccessoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accessory
        fields = '__all__'
