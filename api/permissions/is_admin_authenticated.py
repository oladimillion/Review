from rest_framework import permissions

class IsAdminAuthenticated(permissions.BasePermission):
    """
    Allows access only to authenticated admin.
    """
    message = 'Only Admins are allowed.'

    def has_permission(self, request, view):
        try:
            return request.member.member_type == 'A'
        except:
            return False
