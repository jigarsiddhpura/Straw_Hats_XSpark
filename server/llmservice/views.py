from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import requests
import json
from pdf2jpg import pdf2jpg
import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown
import PIL.Image
from PIL import Image


def get_language_proficiency(username):
    token = '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'
    headers = {'Authorization': f'token {token}'}
    response = requests.get(f'https://api.github.com/users/{username}/repos', headers=headers)

    if response.status_code != 200:
        return f"API request failed with status code {response.status_code}"

    data = response.json()

    languages = {}

    for repo in data:
        lang_response = requests.get(repo['languages_url'], headers=headers)
        lang_data = lang_response.json()

        for lang, size in lang_data.items():
            if lang not in languages:
                languages[lang] = 0
            languages[lang] += int(size)

    total_size = sum(languages.values())
    language_percentages = {lang: f'{100 * size / total_size:.2f}%' for lang, size in languages.items()}

    return json.dumps(language_percentages)

@csrf_exempt
def getLanguageProficiency(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        if username:
            result = get_language_proficiency(username)
            return JsonResponse({"result": result}, status=200)
        else:
            return JsonResponse({"error": "Username not provided"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)




def process_resume():
    genai.configure(api_key="AIzaSyAjtTq0yqohVa8KngPpVUyUeD87Ap17UNE")
    model = genai.GenerativeModel("gemini-pro-vision")
    image_folder_path = 'resume_images'
    directories = [d for d in os.listdir(image_folder_path) if os.path.isdir(os.path.join(image_folder_path, d))]
    for directory in directories:
        directory_path = os.path.join(image_folder_path, directory)
        image_files = [f for f in os.listdir(directory_path) if f.endswith('.jpg')]
        for image_file in image_files:
            image_path = os.path.join(directory_path, image_file)
            image = PIL.Image.open(image_path)
            response = model.generate_content(
                ['''This is the image of the resume summarize the resume and give me a json object which contains 
                 Experience in years
                List of all frameworks he KNOWS 
                List of internship and it's duration and the place where he has done it
                Certifications  list''', image]
            )
            response.resolve()
            return response.text

@csrf_exempt
def review_resume(request):
    if request.method == 'POST':
        pdf_file = request.FILES['resume']  # Get the PDF file from the request

        folder_path = 'resume_pdfs'
        
        # Create the folder if it doesn't exist
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        pdf_path = os.path.join('resume_pdfs', pdf_file.name)  # Create a path for the PDF file
        print("-----------------------")
        print(pdf_path)

        with open(pdf_path, 'wb+') as destination:  # Save the PDF file
            for chunk in pdf_file.chunks():
                destination.write(chunk)

        result = pdf2jpg.convert_pdf2jpg(pdf_path, 'resume_images', dpi=300, pages="ALL")  # Convert the PDF to images
        result = process_resume()  # Process the images
        return JsonResponse({"result": result}, status=200)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
