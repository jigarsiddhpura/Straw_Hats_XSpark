# model imports
from mistral import queryMistral
# langchain imports
from langchain.prompts import PromptTemplate
# from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain.memory import ConversationBufferMemory

# vector embedding
from embed import retriever
from dataclasses import dataclass
from typing import Literal

@dataclass
class Message:
	origin: Literal["human", "ai"]
	message: str

information = {'stack': ['python', 'javascript'], 'experience_in_years': '2'}

class templates: 

    behavioral_template = """ I want you to act as an interviewer. Remember, you are the interviewer not the candidate.   
            Let's think step by step.
            
            Based on the keywords, 
            Create a guideline with the following topics for a behavioral interview to test the soft skills of the candidate. 
            
            Do not ask the same question.
            Do not repeat the question. 
            
            Keywords: 
            {context}

            Question: {question}
            Answer:"""
    
    conversation_template = """I want you to act as an interviewer strictly following the below guidelines in the current conversation.
                            Candidate has no idea what the guideline is.
                            Ask me questions and wait for my answers. Do not write explanations.
                            Ask each question like a real person, only one question at a time.
                            Do not ask the same question.
                            Do not repeat the question.
                            Do ask follow-up questions if necessary. 
                            Your name is MistralInterviewer.
                            I want you to only reply as an interviewer.
                            Do not write all the conversation at once.
                            If there is an error, point it out.

                            Current Conversation:
                            {history}

                            Candidate: {input}
                            AI: """

Behavioral_Prompt = PromptTemplate(input_variables=["context", "question"],template=templates.behavioral_template)

history = []
history.append(Message("ai", "Hello there! I am your interviewer today. I will access your soft skills through a series of questions. Let's get started! Please start by saying hello or introducing yourself."))

memory = ConversationBufferMemory()
