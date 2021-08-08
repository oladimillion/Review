from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api import views


router = DefaultRouter(trailing_slash=False)
router.register('assigned_reviewer', views.AssignedReviewerViewSet, basename='assigned_reviewer')
router.register('member', views.MemberViewSet, basename='member')
router.register('performance_review', views.PerformanceReviewViewSet, basename='performance_review')


schema_view = get_schema_view(
   openapi.Info(
      title='Review API',
      default_version='v1',
      description='Review API documentation',
      contact=openapi.Contact(email='akandeoladimeji9@gmail.com'),
      license=openapi.License(name='BSD License'),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('', include(router.urls)),
    path('swagger/yaml', schema_view.without_ui(cache_timeout=0), name='schema-yaml'),
    path('swagger/json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] 

