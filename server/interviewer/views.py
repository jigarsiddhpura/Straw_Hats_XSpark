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
import os

# HF_BEARER_TOKEN = os.getenv('HF_BEARER_TOKEN')

# API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
# headers = {"Authorization": f"Bearer {HF_BEARER_TOKEN}"}

# with open('..\\sampleUserInfo.json','r') as f:
#     sampleUserInfo = json.loads(f)

# history = ChatMessageHistory()

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
    
# @csrf_exempt
# def getQuestion(request):

#     if request.method == 'POST':
#         if request.POST.get('question') :

#             information = sampleUserInfo["resume_review"]

#             CONVERSATION_PROMPT = f"""Act as a tech interviewer and interview based on the information of the candidate. Please note: Do not answer your own question and only ask one question at a time. The question can be of varying difficulty levels: easy, medium, or hard, and can be related to coding, HR, or any other relevant topic. 
#             Tech stack : {information["skills"]}
#             Years of experiene : {information['experience_in_yers']}.
#             Most Proficient Languagues : {information["certificates"]}
#             Internship : {information['internships']}
#             Memory : {history}
#             """

#             # prompt = PromptTemplate(template=template,input)
#             aiquestion = queryMistral(CONVERSATION_PROMPT)
#             print(aiquestion)

#             # answer = input("\nAnswer : ")

#             # history.add_ai_message(question)
#             # history.add_user_message(answer)

#             # print("-----------------")
            
#             return JsonResponse({"question": aiquestion}, status=200)
#         else :
#             return JsonResponse({"error":"Frame not found"}, status=400)
        
#     else :
#         return JsonResponse({"error":"Method not allowed"}, status=405)
