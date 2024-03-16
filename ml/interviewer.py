# model imports
from mistral import queryMistral
# langchain imports
from langchain.memory import ChatMessageHistory

information = {'stack': ['python', 'javascript'], 'experience_in_years': '2'}

history = ChatMessageHistory()

while (1):

    CONVERSATION_PROMPT = f"""Act as a tech interviewer and interview based on the information of the candidate.NOTE: Do not answer your own question and just ASK one question only. Ask short easy/medium/hard coding/HR questions. 
    Tech stack : {information['stack']}
    Years of experiene : {information['experience_in_years']}.
    Memory : {history}
    """

    # prompt = PromptTemplate(template=template,input)
    question = queryMistral(CONVERSATION_PROMPT)
    print(question)

    answer = input("\nAnswer : ")

    history.add_ai_message(question)
    history.add_user_message(answer)

    print("-----------------")