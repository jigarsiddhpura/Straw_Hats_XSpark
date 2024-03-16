# vector embedding
from sentence_transformers import SentenceTransformer, util
import torch
# from langchain_community.vectorstores import FAISS
# from langchain.text_splitter import NLTKTextSplitter

# model = SentenceTransformer("all-MiniLM-L6-v2")
class Retriever:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def encode_sentences(self, sentences):
        return self.model.encode(sentences, convert_to_tensor=True)

    def retrieve(self, query, corpus_sentences, top_k=1):
        query_embedding = self.model.encode(query, convert_to_tensor=True)
        corpus_embeddings = self.encode_sentences(corpus_sentences)

        # Calculate cosine similarity between query and corpus sentences
        cos_scores = util.pytorch_cos_sim(query_embedding, corpus_embeddings)[0]

        # Get top k most similar sentences
        top_results = torch.topk(cos_scores, k=top_k)

        return [(corpus_sentences[idx], score) for idx, score in zip(top_results.indices, top_results.values)]

# a = embeddings("The quick brown fox jumps over the lazy dog.")
retriever = Retriever()
# corpus_sentences = ["This is a sample sentence.", "Another example sentence."]
# query = "Sample query."
# top_results = retriever.retrieve(query, corpus_sentences)
# print(top_results)

