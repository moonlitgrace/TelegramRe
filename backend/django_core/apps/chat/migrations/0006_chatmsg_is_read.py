# Generated by Django 5.0.1 on 2024-01-24 04:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("chat", "0005_rename_message_chatmsg_content_alter_chatmsg_room"),
    ]

    operations = [
        migrations.AddField(
            model_name="chatmsg",
            name="is_read",
            field=models.BooleanField(default=False),
        ),
    ]
