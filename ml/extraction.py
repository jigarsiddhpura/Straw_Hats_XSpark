# model imports
from mistral import queryMistral
# langchain imports
from langchain.prompts import PromptTemplate
# from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain.memory import ConversationBufferMemory

# vector embedding
# from embed import retriever
from dataclasses import dataclass
from typing import Literal

@dataclass
class Message:
	origin: Literal["human", "ai"]
	message: str

information = {'stack': ['python', 'javascript'], 'experience_in_years': '2'}


history = []
history.append(Message("ai", """I want you to act as an interviewer strictly following the below guidelines in the current conversation.
Ask questions and wait for my answers. Do not write explanations.
Ask each question like a real person, only one question at a time.
Do not ask the same question.
Do not repeat the question.
Your name is MistralInterviewer.
Do not write all the conversation at once.
"""))
history.append(Message("ai", "Hello there! I am your interviewer today. I will access your soft skills through a series of questions. Let's get started! Please start by saying hello or introducing yourself."))

# memory = ConversationBufferMemory()

def conversation_template(history):
        return f"""
        Current Conversation:
        {history}
        Do ask follow-up questions if necessary.If there is an error, point it out.
        """


while(1):

        PROMPT = conversation_template(history)

        question = queryMistral(PROMPT)
        print(question)

        answer = input("\nAnswer : ")

        # memory.save_context({"input": question}, {"output": answer})
        history.append(Message(origin="ai", message=question))
        history.append(Message(origin="human", message=answer))

        print("--------------------\n\n")
        print(history)
        print("--------------------\n\n")