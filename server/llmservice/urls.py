from . import views
from django.urls import path

urlpatterns = [
    path('get_language_proficiency', views.getLanguageProficiency, name='get_language_proficiency'),
    path('review_resume', views.review_resume, name='review_resume'),
]