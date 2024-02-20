import requests
import os
from dotenv import load_dotenv

load_dotenv()


def generate_prompt(data):
    income_details = " and ".join(
        [f"a {income['recurrence'].lower()} income of ${income['amount']}" for income in data['income']])
    expense_details = " and ".join(
        [f"monthly expenses such as {expense['title'].lower()} costing ${expense['amount']}" for expense in data['expenses']])
    wishlist_details = " and ".join(
        [f"wishlist items like {item['title'].lower()} costing ${item['cost']}" for item in data['wishlist']])

    prompt = (
        f"Given that the user has {income_details}, {expense_details}, "
        f"what specific budgeting actions can they take to manage their expenses "
        f"and save for {wishlist_details}?"
    )
    return prompt


def get_financial_insights(data):
    API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct"
    API_KEY = os.getenv('HF_API_KEY')
    headers = {"Authorization": f"Bearer {API_KEY}"}

    inputs = generate_prompt(data)

    payload = {
        "inputs": inputs,
        "parameters": {
            "return_full_text": False,
            "max_length": 2048
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        output = response.json()
        generated_text = output[0].get(
            'generated_text', 'No insights generated.')
        return generated_text
    else:
        return {'error': f'Failed to fetch financial insights, status code: {response.status_code}'}


def process_financial_data(data):
    insights = get_financial_insights(data)
    return {"insights": insights}
