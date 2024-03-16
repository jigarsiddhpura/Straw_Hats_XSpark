from deepface import DeepFace
import cv2
import os
from dotenv import load_dotenv
load_dotenv()

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# path = os.path.join("STRAW_HATS_XSPARK","ml","emotion_analysis","images","sad.jpg")
# print(f"Path: {path}")

# # Check if the file exists
# if not os.path.exists(path):
#     print(f"Error: File not found at {path}")
# else:
#     print("File exists.")


# image = cv2.imread(path)
image = cv2.imread(".\\images\\confuse.jpg")

result = DeepFace.analyze(image, actions=["emotion"], detector_backend='mediapipe')
print(result)