# Generated by Django 5.0.6 on 2024-07-14 16:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_driver_date_of_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='bus',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.bus'),
        ),
    ]
