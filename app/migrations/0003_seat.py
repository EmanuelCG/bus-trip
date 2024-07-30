# Generated by Django 5.0.6 on 2024-07-23 23:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_ticket_seat_alter_journey_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seat_number', models.CharField(max_length=2)),
                ('status', models.BooleanField(default=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('bus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.bus')),
            ],
        ),
    ]