from django.db import models
from django.contrib.auth import get_user_model


class Appliance(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    brand = models.CharField(max_length=50)
    appliance_type = models.CharField(max_length=50)
    model_number = models.CharField(max_length=50, blank=True)
    serial_number = models.CharField(max_length=50, blank=True)
    purchase_date = models.DateTimeField(blank=True, null=True)
    last_serviced = models.DateTimeField(blank=True, null=True)
    # images
    # category = models.ManyToManyField(Category)
    manual_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.owner}\'s {self.brand} {self.appliance_type}'
