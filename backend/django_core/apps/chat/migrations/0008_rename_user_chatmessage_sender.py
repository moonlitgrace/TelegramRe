# Generated by Django 5.0.1 on 2024-01-24 09:55

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("chat", "0007_alter_chatmessage_options_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="chatmessage",
            old_name="user",
            new_name="sender",
        ),
    ]