from django.db import models
from .base_model import BaseModel
from .member import Member
from .performance_review import PerformanceReview

class AssignedReviewer(BaseModel):
    performance_review = models.ForeignKey(PerformanceReview, on_delete=models.CASCADE, null=True, blank=True)
    reviewer = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='reviewer_assigned', null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ('-updated_at',)
        db_table = 'assigned_reviewer'
        unique_together = ('performance_review', 'reviewer',)

    def __str__(self):
        return str(self.reviewer)
