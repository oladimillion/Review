# https://github.com/django/django/blob/master/django/contrib/auth/hashers.py
from django.contrib.auth.hashers import make_password, identify_hasher
from django.db import models
from .base_model import BaseModel


class Member(BaseModel):

    MEMBER_TYPE_CHOICES = [
        ('A', 'Admin'),
        ('U', 'User'),
    ]
    name = models.CharField(max_length=250, unique=True)
    password = models.CharField(max_length=250, null=True, blank=True)
    member_type = models.CharField(
        max_length=2,
        choices=MEMBER_TYPE_CHOICES,
        default='U',
    )

    def save(self, *args, **kwargs):
        if self.name:
            # convert name to lower case
            self.name = self.name.lower().strip()

        if self.password and not self.is_password_hashed(self.password):
            # hashing the password if not already hashed
            self.password = make_password(self.password)
        return super(Member, self).save(*args, **kwargs)

    def is_password_hashed(self, password):
        try:
            # checking whether the password is alread hashed
            hasher = identify_hasher(self.password)
            return True
        except ValueError:
            return False

    def __str__(self):
        return self.name or 'na'

    class Meta:
        db_table = 'member'
        verbose_name_plural = "members"
        ordering = ('-updated_at',)
