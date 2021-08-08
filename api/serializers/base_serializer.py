from rest_framework import serializers


class BaseSerializer(serializers.ModelSerializer):
    
    class Meta:
        read_only_fields = ('created_at', 'updated_at')
        abstract = True
