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

# interview.py
# langchain imports
from langchain.memory import ChatMessageHistory
import json
import requests

import pyttsx3
import librosa
import webrtcvad
from transformers import pipeline

def queryMistral(query : str):
    response = requests.post(API_URL, headers=headers, json={"inputs":f"<s>[INST] {query} [/INST]"})
    res = response.json()
    res = postProcessMistralOutput(res[0]['generated_text'])
    return res

def postProcessMistralOutput(input : str):
    inst_index = input.find("[/INST]")
    if inst_index != -1:
        return input[inst_index + len("[/INST]"):].strip()
    else:
        return input

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

    
@csrf_exempt
def calculateSNR(request):
    """calculates signal-to-noise ratio (SNR) for a given audio file"""

    if request.method == 'POST':
        if request.FILES.get('wav_file') :

            wav_file = request.FILES['wav_file']

            # FILE FORMAT  SHOULD BE AMONG - .wav, .mp3, .flac, and .ogg
            audio_data, rate = librosa.load(wav_file, mono=True)

            audio_data = audio_data.astype(np.int16)

            vad = webrtcvad.Vad() # 3 is the highest aggressiveness setting

            vad_result = vad.is_speech(audio_data.tobytes(), rate)

            e = np.array(vad_result, dtype=float)

            S = np.sum(audio_data**2 * e)
            N = np.sum(audio_data**2 * (1 - e))

            # Calculate SNR
            snr = 10 * np.log10((S / N))
            
            return JsonResponse({"signal_to_noise_ratio": snr}, status=200)
        else :
            return JsonResponse({"error":"Frame not found"}, status=400)

    else :
        return JsonResponse({"error":"Method not allowed"}, status=405)

    
