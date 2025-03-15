from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile  # Make sure you have this model in models.py
        fields = ['user', 'startup_name', 'industry', 'location', 'funding_stage']



from rest_framework import serializers
from tenders.models import ForumPost, ForumComment

from rest_framework import serializers
from .models import ForumPost

class ForumPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumPost
        fields = '__all__'

class ForumCommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = ForumComment
        fields = '__all__'


from rest_framework import serializers
from .models import Tender

class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = '__all__'

