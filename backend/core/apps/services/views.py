from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.apps.tasks.models import Todo, Group
import json


@api_view(['GET', 'POST'])
def new_todo(request):

    if request.method == 'POST':

        data = json.loads(request.body.decode('utf-8'))
        print(data['due_date'])
        todo = Todo.objects.create(name=data['todo_name'],
                                   description='none', assignee_id=2, due_date=data['due_date'])

        get_column = Group.objects.filter(id=data['column']).first()

        get_column.order['order'].append(todo.id)

        get_column.save()

        return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def reorder(request):

    if request.method == 'POST':

        data = json.loads(request.body.decode('utf-8'))

        get_column = Group.objects.filter(id=data['column']).first()

        task_orders = data['task_orders']

        get_column.order = {"order": list(task_orders)}

        get_column.save()

        return Response(status=status.HTTP_200_OK)
