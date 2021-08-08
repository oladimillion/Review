from api.models import PerformanceReview
from api.serializers import PerformanceReviewSerializer
from .base_model_viewset import BaseModelViewSet
from api.permissions import IsAdminAuthenticated

class PerformanceReviewViewSet(BaseModelViewSet):
    queryset = PerformanceReview.objects.all()
    serializer_class = PerformanceReviewSerializer
    permission_classes = (IsAdminAuthenticated,)

