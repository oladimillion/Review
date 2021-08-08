from rest_framework import response, decorators
from api.models import AssignedReviewer
from api.serializers import AssignedReviewerSerializer
from .base_model_viewset import BaseModelViewSet
from api.permissions import (
    IsAdminAuthenticated,
    IsUserAuthenticated,
)


class AssignedReviewerViewSet(BaseModelViewSet):
    queryset = AssignedReviewer.objects.all()
    serializer_class = AssignedReviewerSerializer
    permission_classes = (IsAdminAuthenticated,)

    @decorators.action(
            methods=['patch'], 
            detail=True, 
            url_path='update_reviewer_review', 
            url_name='update_reviewer_review',
            permission_classes=(IsUserAuthenticated,),
        )
    def update_reviewer_review(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(serializer.data)

    @decorators.action(
            methods=['get'], 
            detail=True, 
            url_path='get_reviewer_review', 
            url_name='get_reviewer_review',
            permission_classes=(IsUserAuthenticated,),
        )
    def get_reviewer_review(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)

    @decorators.action(
            methods=['get'], 
            detail=False, 
            url_path='get_reviewer_reviews', 
            url_name='get_reviewer_reviews',
            permission_classes=(IsUserAuthenticated,),
        )
    def get_reviewer_reviews(self, request, *args, **kwargs):
        instances = self.get_queryset().filter(reviewer=request.member)
        serializer = self.get_serializer(instances, many=True)
        return response.Response(serializer.data)


