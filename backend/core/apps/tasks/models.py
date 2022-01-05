from django.db import models
from django.contrib.auth.models import User


class Todo(models.Model):
    name = models.CharField(db_index=True, max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(default="2022-01-23T16:44")
    description = models.TextField()
    is_completed = models.BooleanField(default=False)
    assignee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user'
    )

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(db_index=True, max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.JSONField()

    def __str__(self):
        return self.title
