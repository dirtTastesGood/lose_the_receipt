# Generated by Django 3.1.1 on 2020-10-26 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appliances', '0006_appliance_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appliance',
            name='slug',
            field=models.SlugField(max_length=200),
        ),
    ]
