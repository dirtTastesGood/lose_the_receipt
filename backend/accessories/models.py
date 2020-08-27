from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

from appliances.models import Appliance

class Accessory(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)
    # category = models.ManyToManyField(Category)
    model_number = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=50)
    appliance = models.ForeignKey(Appliance, on_delete=models.CASCADE)
    rating = models.IntegerField(
        null=True,
        default=null,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    purchase_date = models.DateTimeField(blank=True,null=True)
    notes = models.TextField(max_length=10000)
    
