from . import views
from django.urls import path

urlpatterns = [
    path('getEmotion', views.getEmotion, name='getEmotion'),
    # path('getQuestion', views.getQuestion, name='getQuestion'),
]