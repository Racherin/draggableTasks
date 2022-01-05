from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from core.apps.services.views import new_todo, reorder

urlpatterns = [
    path('newtodo/', new_todo),
    path('reorder/', reorder),
]

urlpatterns = format_suffix_patterns(urlpatterns)
