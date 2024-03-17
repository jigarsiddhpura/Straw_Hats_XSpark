from . import views
from django.urls import path

urlpatterns = [
    path('getEmotion', views.getEmotion, name='getEmotion'),
    path('calculateSNR', views.calculateSNR, name='calculateSNR'),
    # path('getQuestion', views.getQuestion, name='getQuestion'),
]