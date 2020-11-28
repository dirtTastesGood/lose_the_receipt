from django.db import models
# from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model
from appliances.models import Appliance


class Accessory(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=1000)
    # category = models.ManyToManyField(Category)
    model_number = models.CharField(max_length=50, null=True, blank=True)
    serial_number = models.CharField(max_length=50, null=True, blank=True, error_messages={
                                     'unique': 'An accessory already exists with that serial number'})
    appliance = models.ForeignKey(
        Appliance, on_delete=models.CASCADE, null=True, blank=True, related_name="accessories")
    # electronic = models.ForeignKey(
    #     Electronic, on_delete=models.CASCADE, null=True, blank=True)
    # rating = models.IntegerField(
    #     null=True,
    #     validators=[MinValueValidator(1), MaxValueValidator(5)]
    # )
    purchase_date = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(max_length=10000, blank=True, null=True)
    slug = models.SlugField(max_length=200)

    # @property
    # def accessory_of(self):
    #     return self.appliance

    # @accessory_of.setter
    # def accessory_of(self, obj):
    #     if type(obj) == Appliance:
    #         self.electronic = None
    #         self.appliance = obj
    #     elif type(obj) == Electronic:
    #         self.electronic = obj
    #         self.appliance = None
    #     else:
    #         raise ValueError(
    #             "obj parameter must be an object of Appliance or Electronic class")

    def __str__(self):
        output = self.name
        if self.appliance:
            output += f' {self.appliance.brand} - {self.appliance.appliance_type} - '

        output += f' - {self.description[:20]}' if len(
            self.description) > 20 else self.description
        return output

    class Meta:
        verbose_name_plural = 'accessories'
