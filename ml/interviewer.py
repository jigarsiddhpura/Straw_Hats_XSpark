# model imports
from mistral import queryMistral
# langchain imports
from langchain.memory import ChatMessageHistory

proficiency = {"HTML": "2.19%", "JavaScript": "10.43%", "Jupyter Notebook": "54.51%", "Python": "8.94%", "Java": "0.21%", "CSS": "1.53%", "MATLAB": "0.00%", "Procfile": "0.00%", "TypeScript": "20.81%", "C": "1.17%", "C++": "0.21%"}
sorted_proficiency = sorted(proficiency.items(), key=lambda x: float(x[1].rstrip('%')), reverse=True)
sorted_dict = dict(sorted_proficiency)
print(sorted_dict)

information = {'stack': ['python', 'javascript','machine learning'], 'experience_in_years': '2', 'proficiency':proficiency}

history = ChatMessageHistory()

while (1):

    CONVERSATION_PROMPT = f"""Act as a tech interviewer and interview based on the information of the candidate. Please note: Do not answer your own question and only ask one question at a time. The question can be of varying difficulty levels: easy, medium, or hard, and can be related to coding, HR, or any other relevant topic. 
    Tech stack : {information['stack']}
    Years of experiene : {information['experience_in_years']}.
    Most Proficient Languagues : {sorted_dict.keys()} 
    Memory : {history}
    """

    # prompt = PromptTemplate(template=template,input)
    question = queryMistral(CONVERSATION_PROMPT)
    print(question)

    answer = input("\nAnswer : ")

    history.add_ai_message(question)
    history.add_user_message(answer)

    print("-----------------")