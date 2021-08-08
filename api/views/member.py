from rest_framework import response, status, decorators
from django.contrib.auth.hashers import check_password
from api.models import Member
from api.serializers import MemberSerializer, BasicMemberSerializer
from .base_model_viewset import BaseModelViewSet
from api.permissions import (
    IsUserAuthenticated,
    IsAdminAuthenticated,
)
from api.helpers import get_object, token


class MemberViewSet(BaseModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @decorators.action(
            methods=['post'], 
            detail=False, 
            url_path='credential_check', 
            url_name='credential_check'
        )
    def credential_check(self, request, *args, **kwargs):
        name = request.data.get('name', None)
        member = get_object(Member, name=name)

        if not member:
            return response.Response(
                    { 'name': ['User does not exist'] }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        return response.Response({
                'name_exist': True,
                'password_exist': bool(member.password),
            })

    @decorators.action(
            methods=['post'], 
            detail=False, 
            url_path='set_password', 
            url_name='set_password'
        )
    def set_password(self, request, *args, **kwargs):
        name = request.data.get('name', None)
        password = request.data.get('password', None)
        member = get_object(Member, name=name)

        if not member:
            return response.Response(
                    { 'name': ['User does not exist'] }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        if member.password:
            return response.Response(
                    { 'password': ['Password already set. Kindly log in'] }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        member.password = password
        member.save()

        mid = self.get_serializer(member).data.get("id")
        return response.Response({
                'token': token.encode({ "mid": mid })
            })

    @decorators.action(
            methods=['get'], 
            detail=True, 
            url_path='get_user', 
            url_name='get_user',
            permission_classes=[IsAdminAuthenticated],
        )
    def get_user(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)

    @decorators.action(
            methods=['post'], 
            detail=False, 
            url_path='add_user', 
            url_name='add_user',
            permission_classes=[IsAdminAuthenticated],
        )
    def add_user(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

    @decorators.action(
            methods=['patch'], 
            detail=True, 
            url_path='update_user', 
            url_name='update_user',
            permission_classes=[IsAdminAuthenticated],
        )
    def update_user(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(serializer.data)

    @decorators.action(
            methods=['delete'], 
            detail=True, 
            url_path='delete_user', 
            url_name='delete_user',
            permission_classes=[IsAdminAuthenticated],
        )
    def delete_user(self, request, *args, **kwargs):
        self.get_object().delete()
        return response.Response({}, status=status.HTTP_200_OK)

    @decorators.action(
            methods=['post'], 
            detail=False, 
            url_path='signin', 
            url_name='signin',
        )
    def signin(self, request, *args, **kwargs):
        name = request.data.get('name', None)
        password = request.data.get('password', None)
        member = get_object(Member, name=name)

        if member is None or not check_password(password, member.password):
            return response.Response(
                    { 'user': ['Invalid credentials provided'] }, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        mid = self.get_serializer(member).data.get("id")
        return response.Response({
                'token': token.encode({ 'mid': mid })
            })

    @decorators.action(
            methods=['get'], 
            detail=False, 
            url_path='get_self', 
            url_name='get_self',
            permission_classes=[IsUserAuthenticated|IsAdminAuthenticated],
        )
    def get_self(self, request, *args, **kwargs):
        serializer = BasicMemberSerializer(request.member)
        return response.Response(serializer.data)

    @decorators.action(
            methods=['get'], 
            detail=False, 
            url_path='get_users', 
            url_name='get_users',
            permission_classes=(IsAdminAuthenticated,),
        )
    def get_users(self, request, *args, **kwargs):
        instances = self.get_queryset().filter(member_type='U')
        serializer = BasicMemberSerializer(instances, many=True)
        return response.Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # create member route will do nothing
        return self.do_nothing()

    def update(self, request, *args, **kwargs):
        # update member route will do nothing
        return self.do_nothing()

    def destroy(self, request, *args, **kwargs):
        # delete member route will do nothing
        return self.do_nothing()

    def list(self, request, *args, **kwargs):
        # list member route will do nothing
        return self.do_nothing([])

    def retrieve(self, request, *args, **kwargs):
        # retrieve member route will do nothing
        return self.do_nothing()





