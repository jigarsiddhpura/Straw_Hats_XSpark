from . import views
from django.urls import path

urlpatterns = [
    path('review_resume', views.review_resume, name='review_resume')
]