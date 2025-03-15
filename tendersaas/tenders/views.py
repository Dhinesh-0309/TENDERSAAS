from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import UserProfile

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()
    return Response({"message": "User created successfully"}, status=201)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)

    user = authenticate(username=user.username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {  # ✅ Added user details to response
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=200)
    else:
        return Response({"error": "Invalid credentials"}, status=400)


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile

@api_view(['POST'])
def save_personal_details(request):
    data = request.data

    user_id = data.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Create or update UserProfile
    profile, created = UserProfile.objects.get_or_create(user=user)
    profile.full_name = data.get('full_name', profile.full_name)
    profile.startup_name = data.get('startup_name', profile.startup_name)
    profile.industry = data.get('industry', profile.industry)
    profile.funding_stage = data.get('funding_stage', profile.funding_stage)
    profile.location = data.get('location', profile.location)
    profile.save()

    return Response(
        {"message": "Personal details saved successfully"},
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
    )









from rest_framework import generics, permissions
from tenders.models import ForumPost, ForumComment
from .serializers import ForumPostSerializer, ForumCommentSerializer

from rest_framework import generics
from .models import ForumPost, ForumComment
from .serializers import ForumPostSerializer, ForumCommentSerializer

class ForumPostListCreateView(generics.ListCreateAPIView):
    queryset = ForumPost.objects.all().order_by('-created_at')
    serializer_class = ForumPostSerializer

class ForumCommentListCreateView(generics.ListCreateAPIView):
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializer


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import ForumLike
from rest_framework.response import Response

class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        try:
            post = ForumPost.objects.get(id=post_id)
        except ForumPost.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        like, created = ForumLike.objects.get_or_create(user=user, post=post)

        if not created:
            like.delete()
            return Response({"message": "Like removed"}, status=200)

        return Response({"message": "Post liked"}, status=201)




from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tender
from .serializers import TenderSerializer

# Fetch Latest 5 Open Tenders
@api_view(['GET'])
def latest_tenders(request):
    tenders = Tender.objects.filter(status="Open").order_by('-deadline')[:5]
    serializer = TenderSerializer(tenders, many=True)
    return Response(serializer.data)

# Fetch All Tenders
@api_view(['GET'])
def all_tenders(request):
    tenders = Tender.objects.all().order_by('-deadline')
    serializer = TenderSerializer(tenders, many=True)
    return Response(serializer.data)

# Fetch a Single Tender by ID
@api_view(['GET'])
def tender_detail(request, tender_id):
    try:
        tender = Tender.objects.get(id=tender_id)
        serializer = TenderSerializer(tender)
        return Response(serializer.data)
    except Tender.DoesNotExist:
        return Response({"error": "Tender not found"}, status=404)
