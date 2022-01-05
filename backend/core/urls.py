from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('auth/', include('core.apps.authentication.urls')),
    path('tasks/', include('core.apps.tasks.urls')),
    path('services/', include('core.apps.services.urls'))

]
