from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    startup_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    funding_stage = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username


from django.db import models
from django.contrib.auth.models import User

class ForumPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ForumComment(models.Model):
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.post.title}'


class ForumLike(models.Model):
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'user')  # Prevent duplicate likes from the same user

    def __str__(self):
        return f"{self.user.username} liked {self.post.title}"


from django.db import models

class Tender(models.Model):
    title = models.CharField(max_length=255)
    sector = models.CharField(max_length=100)
    tender_type = models.CharField(max_length=50)  # University, College, Government
    location = models.CharField(max_length=100)
    published_by = models.CharField(max_length=255)
    description = models.TextField()
    tender_value = models.IntegerField()
    deadline = models.DateField()
    status = models.CharField(max_length=50)  # Open or Closed

    def __str__(self):
        return self.title
