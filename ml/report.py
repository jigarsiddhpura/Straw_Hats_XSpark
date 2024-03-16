from mistral import queryMistral


def behoavioral_report(history : list):
    pass

def tech_report(history : list):
    PROMPT = f"""
    `{history}`

    Please provide a summary in JSON format. The JSON should include the following keys:

    - "summary": A concise summary of the text.
    - "key_points": A list of the most important points or themes identified in the text.
    - "sentiment": The overall sentiment of the text (e.g., positive, negative, neutral).

    Example JSON format:

    {
    "summary": "A brief overview of the main points discussed in the text.",
    "key_points": [
        "First key point",
        "Second key point",
        "Third key point"
    ],
    "sentiment": "positive"
    }

    Please ensure the summary is accurate and reflects the main ideas of the text.
    """

    PROMPT2 = f"""Act as a pro senior developer and generate a detailed report based on the conversaiton provided. Include key points in the report like
    1. Number of questions answered correctly.
    2. How deeply is the question answered.
    Conversation : {history}
    """

    output = queryMistral(PROMPT2)
    return output
