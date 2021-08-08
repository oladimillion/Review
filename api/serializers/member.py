from api.models import Member
from .base_serializer import BaseSerializer


class MemberSerializer(BaseSerializer):

    class Meta:
        fields = '__all__'
        model = Member


class BasicMemberSerializer(BaseSerializer):

    class Meta:
        fields = ('name', 'id', 'member_type',)
        model = Member
