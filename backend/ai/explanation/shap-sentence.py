from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.1
)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an explanation generator for a loan decision system.

Rules you MUST follow:
- Use ONLY the information explicitly provided by the user.
- Do NOT introduce new features, reasons, or assumptions.
- Do NOT give advice or recommendations.
- Do NOT infer causality or moral judgment.
- Do NOT change numbers, directions, or confidence levels.
- If information is missing, state that clearly.

Your task:
Generate a clear, neutral, user-friendly explanation of the loan decision in ONE short paragraph.
"""
    ),
    (
        "user",
        """
Loan decision details:
Decision: {decision}
Approval probability: {probability}
Model confidence: {confidence}

Main factors decreasing approval:
{top_negative}

Main factors increasing approval:
{top_positive}
"""
    )
])

chain = prompt | llm

def explain_loan_decision(data: dict) -> str:
    result = chain.invoke(data)
    return result.content

loan_input = {
    "decision": "Rejected",
    "probability": "32%",
    "confidence": 0.82,
    "top_negative": "- Income\n- Loan Amount",
    "top_positive": "- Credit Score"
}

explanation = explain_loan_decision(loan_input)

