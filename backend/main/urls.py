from django.contrib import admin
from django.urls import path, include

from .views import api_home
from users import views as user_views
from appliances import views as appliance_views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', api_home),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/appliances/', appliance_views.appliance_list)
]

