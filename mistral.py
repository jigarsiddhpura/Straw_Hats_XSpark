import requests
import os
from dotenv import load_dotenv

load_dotenv()

HF_BEARER_TOKEN = os.getenv('HF_BEARER_TOKEN')

API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
headers = {"Authorization": f"Bearer {HF_BEARER_TOKEN}"}

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
