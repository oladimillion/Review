from rest_framework import serializers
from api.models import PerformanceReview
from .base_serializer import BaseSerializer
from .member import BasicMemberSerializer


class PerformanceReviewSerializer(BaseSerializer):
    member_detail = serializers.SerializerMethodField()

    class Meta:
        fields = '__all__'
        model = PerformanceReview

    def get_member_detail(self, obj):
        return BasicMemberSerializer(obj.member).data

