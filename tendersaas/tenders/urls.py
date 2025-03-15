from django.urls import path
from .views import save_personal_details, signup, login
from .views import ForumPostListCreateView, ForumCommentListCreateView
from .views import LikePostView
from .views import latest_tenders, all_tenders, tender_detail

urlpatterns = [
    path('auth/signup/', signup, name='signup'),
    path('auth/login/', login, name='login'),
    path('user/save-details/', save_personal_details, name='save_details'),
    path('forum/posts/', ForumPostListCreateView.as_view(), name='forum-posts'),
    
    path('forum/posts/<int:post_id>/like/', LikePostView.as_view(), name='like-post'),
    path('forum/comments/', ForumCommentListCreateView.as_view(), name='forum-comments'),
    path('api/tenders/latest/', latest_tenders, name='latest_tenders'),
    path('api/tenders/', all_tenders, name='all_tenders'),
    path('api/tenders/<int:tender_id>/', tender_detail, name='tender_detail'),

]




