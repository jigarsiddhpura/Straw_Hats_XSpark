import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import pyttsx3
import librosa
import webrtcvad
from transformers import pipeline
import numpy as np


def voicePlay(string):

    engine = pyttsx3.init()
    engine.say(f"{string}") 
    try:
        engine.runAndWait()
    except Exception as e:
        pass
    engine.runAndWait()

# voicePlay("hello jigar how r u")

def perform_sentiment_analysis(text):
    model_name = "distilbert-base-uncased-finetuned-sst-2-english"
    sentiment_analysis = pipeline("sentiment-analysis", model=model_name)

    results = sentiment_analysis(text)
    sentiment_label = results[0]['label']
    sentiment_score = results[0]['score']
    return sentiment_label, sentiment_score


def calculateSNR(path_to_wav_file):
    """calculates signal-to-noise ratio (SNR) for a given audio file"""

    # FILE FORMAT  SHOULD BE AMONG - .wav, .mp3, .flac, and .ogg
    audio_data, rate = librosa.load(path_to_wav_file, mono=True)
    print(f"audio data = {audio_data}\n\n")
    print(f"rate = {rate}\n\n")

    if rate not in [8000, 16000, 32000, 48000]:
        audio_data = librosa.resample(audio_data, orig_sr = rate, target_sr = 16000) # Resample to 16000 Hz

    # Ensure the audio data is 16-bit
    audio_data = audio_data.astype(np.int16)

    vad = webrtcvad.Vad() # 3 is the highest aggressiveness setting

    # assuming audio data is a 1D np array of int16
    vad_result = vad.is_speech(audio_data.tobytes(), rate)

    # Assuming vad_result is a binary array indicating speech (1) and non-speech (0)
    e = np.array(vad_result, dtype=float)

    # Calculate S and N
    S = np.sum(audio_data**2 * e)
    N = np.sum(audio_data**2 * (1 - e))

    # Calculate SNR
    snr = 10 * np.log10((S / N))

    print(f"SNR: {snr} dB")

calculateSNR(".\\sparktest.wav")