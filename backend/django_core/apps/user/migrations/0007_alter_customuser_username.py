# Generated by Django 5.0 on 2024-01-14 11:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0006_alter_customuser_managers_alter_customuser_email_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="username",
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
