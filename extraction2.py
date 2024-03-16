# model imports
from mistral import queryMistral
# langchain imports
from langchain.prompts import PromptTemplate
# from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain.memory import ConversationBufferMemory

# vector embedding
from embed import embeddings

information = {'stack': ['python', 'javascript'], 'experience_in_years': '2'}

memory = ConversationBufferMemory(return_messages=True)



while (1):
    prompt = f"""Act as a tech interviewer and interview based on the information of the candidate.NOTE: Do not answer your own question and just ASK one question only.
    Tech stack : {information['stack']}
    Years of experiene : {information['experience_in_years']}.
    Memory : {memory}
    """

    # prompt = PromptTemplate(template=template,input)
    question = queryMistral(prompt)
    print(question)

    answer = input("\nAnswer : ")

    memory.save_context({"input": question}, {"output": answer})
    print("-----------------")