from django.urls import path
from core.apps.tasks.views import TodoDetail, TodoList, GroupDetail, GroupList

urlpatterns = [
    path('todos/<int:pk>', TodoDetail.as_view()),
    path('todos/', TodoList.as_view()),
    path('groups/<int:pk>', GroupDetail.as_view()),
    path('groups/', GroupList.as_view()),

]
