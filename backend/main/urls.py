from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

from .views import api_home
from users import views as user_views
from appliances import views as appliance_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('logout/', auth_views.LogoutView.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', api_home),
    path('api/v1/users', user_views.user_list),
    path('api/v1/appliances', appliance_views.appliance_list)
]

