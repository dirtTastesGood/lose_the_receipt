# Generated by Django 3.1.1 on 2020-10-21 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appliances', '0002_auto_20201019_2309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appliance',
            name='last_serviced',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='appliance',
            name='purchase_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]