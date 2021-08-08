from rest_framework import permissions

class IsUserAuthenticated(permissions.BasePermission):
    """
    Allows access only to authenticated user.
    """
    message = 'Only Users are allowed.'

    def has_permission(self, request, view):
        try:
            return request.member.member_type == 'U'
        except:
            return False

