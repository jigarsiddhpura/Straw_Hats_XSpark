# vector embedding
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import NLTKTextSplitter

def embeddings(text):
	text_splitter = NLTKTextSplitter()
	texts = text_splitter.split_text(text)
	embeddings = OpenAIEmbeddings()
	docsearch = FAISS.from_texts(texts, embeddings)
	retriever = docsearch.as_retriever(search_tupe='similarity search')
	return retriever