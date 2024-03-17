import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from deepface import DeepFace
import cv2
from dotenv import load_dotenv
load_dotenv()
from PIL import Image


# path = os.path.join("STRAW_HATS_XSPARK","ml","emotion_analysis","images","sad.jpg")
# print(f"Path: {path}")

# # Check if the file exists
# if not os.path.exists(path):
#     print(f"Error: File not found at {path}")
# else:
#     print("File exists.")


# image = cv2.imread(path)

def getEmotion(frame):
    # image = cv2.imread(".\\images\\confuse.jpg")

    # opencv fraome to PIL Image
    image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    
    result = DeepFace.analyze(image, actions=["emotion"], detector_backend='mediapipe')
    print(result)
