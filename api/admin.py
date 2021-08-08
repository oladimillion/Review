from django.contrib import admin
from api import models

admin.site.site_header = 'Review Admin'
admin.site.site_title = 'Review Portal'
admin.site.index_title = 'Welcome to Review Portal'

@admin.register(models.AssignedReviewer)
class AssignedReviewerAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'feedback',)
    search_fields = ('reviewer', 'feedback',)


@admin.register(models.Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'member_type',)
    search_fields = ('name', 'member_type',)
    readonly_fields = ('password', )


@admin.register(models.PerformanceReview)
class PerformanceReviewAdmin(admin.ModelAdmin):
    list_display = ('member', 'performance',)
    search_fields = ('member', 'performance',)


