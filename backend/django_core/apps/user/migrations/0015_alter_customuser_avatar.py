# Generated by Django 5.0.4 on 2024-05-06 05:27

import dynamic_filenames
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0014_alter_onlineuser_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="avatar",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to=dynamic_filenames.FilePattern(
                    filename_pattern="avatar/{uuid:s}{ext}"
                ),
            ),
        ),
    ]