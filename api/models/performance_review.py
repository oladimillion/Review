from django.db import models
from .base_model import BaseModel
from .member import Member

class PerformanceReview(BaseModel):
    member = models.OneToOneField(Member, on_delete=models.CASCADE)
    performance = models.TextField()

    class Meta:
        ordering = ('-updated_at',)
        db_table = 'performance_review'

    def __str__(self):
        return str(self.member)
