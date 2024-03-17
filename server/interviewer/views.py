from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# emotions.py
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from deepface import DeepFace
import cv2
from dotenv import load_dotenv
import numpy as np
load_dotenv()
from PIL import Image

def process_image(image):
    # Convert the image to OpenCV format
    nparr = np.fromstring(image.read(), np.uint8)
    cv_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    return cv_image

# Create your views here.
@csrf_exempt
def getEmotion(request):

    if request.method == 'POST':
        if request.FILES.get('frame') :

            frame = request.FILES['frame']  # base64 encoded image string
            frame = process_image(frame)

            emotions :list = DeepFace.analyze(frame, actions=["emotion"], detector_backend='mediapipe')
            dominant_emotion = emotions[0]['dominant_emotion']
            map = {'angry': 'angry', 'disgust': 'disgust', 'fear': 'nervous', 'happy': 'confident', 'sad': 'stressed', 'surprise': 'surprise', 'neutral': 'thinking'}

            print(map[dominant_emotion])
            mapped_emotion = map[dominant_emotion]
            return JsonResponse({"dominant_emotion": mapped_emotion}, status=200)
        else :
            return JsonResponse({"error":"Frame not found"}, status=400)
        
    else :
        return JsonResponse({"error":"Method not allowed"}, status=405)
    

def getQuestion(request):

    if request.method == 'POST':
        if request.FILES.get('frame') :

            frame = request.FILES['frame']  # base64 encoded image string
            frame = process_image(frame)

            emotions :list = DeepFace.analyze(frame, actions=["emotion"], detector_backend='mediapipe')
            dominant_emotion = emotions[0]['dominant_emotion']
            map = {'angry': 'angry', 'disgust': 'disgust', 'fear': 'nervous', 'happy': 'confident', 'sad': 'stressed', 'surprise': 'surprise', 'neutral': 'thinking'}

            print(map[dominant_emotion])
            mapped_emotion = map[dominant_emotion]
            return JsonResponse({"dominant_emotion": mapped_emotion}, status=200)
        else :
            return JsonResponse({"error":"Frame not found"}, status=400)
        
    else :
        return JsonResponse({"error":"Method not allowed"}, status=405)
