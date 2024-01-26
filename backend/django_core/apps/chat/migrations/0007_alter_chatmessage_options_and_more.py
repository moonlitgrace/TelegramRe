# Generated by Django 5.0.1 on 2024-01-24 05:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("chat", "0006_chatmsg_is_read"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="chatmessage",
            options={"get_latest_by": ["order_timestamp"], "ordering": ["timestamp"]},
        ),
        migrations.RenameField(
            model_name="chatmessage",
            old_name="message",
            new_name="content",
        ),
        migrations.RenameField(
            model_name="chatmessage",
            old_name="date",
            new_name="timestamp",
        ),
        migrations.RemoveField(
            model_name="chatmessage",
            name="reciever",
        ),
        migrations.RemoveField(
            model_name="chatmessage",
            name="sender",
        ),
        migrations.AddField(
            model_name="chatmessage",
            name="room",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="chat_message",
                to="chat.chatroom",
            ),
        ),
        migrations.AddField(
            model_name="chatmessage",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.DeleteModel(
            name="ChatMsg",
        ),
    ]