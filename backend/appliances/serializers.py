from rest_framework import serializers
from .models import Appliance


class ApplianceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appliance
        fields = '__all__'


class ApplianceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appliance
        fields = ['brand', 'appliance_type', 'model_number',
                  'serial_number', 'purchase_date', 'location', 'description']
