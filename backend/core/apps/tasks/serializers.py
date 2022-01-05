from rest_framework import serializers
from core.apps.tasks.models import Todo, Group


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):

    name = serializers.CharField(required=False)

    class Meta:
        model = Group
        fields = "__all__"
