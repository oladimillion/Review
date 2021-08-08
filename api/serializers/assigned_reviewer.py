from rest_framework import serializers
from api.models import AssignedReviewer, PerformanceReview
from api.helpers import get_object
from .base_serializer import BaseSerializer
from .member import BasicMemberSerializer
from .performance_review import PerformanceReviewSerializer


class AssignedReviewerSerializer(BaseSerializer):
    reviewer_detail = serializers.SerializerMethodField()
    performance_review_detail = serializers.SerializerMethodField()

    class Meta:
        fields = '__all__'
        model = AssignedReviewer

    def get_reviewer_detail(self, obj):
        return BasicMemberSerializer(obj.reviewer).data

    def get_performance_review_detail(self, obj):
        return PerformanceReviewSerializer(obj.performance_review).data

