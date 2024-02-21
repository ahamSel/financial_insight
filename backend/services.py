import requests
import os
from dotenv import load_dotenv

load_dotenv()


def generate_prompt(data):
    income_details = " and ".join(
        [f"a {income.get('recurrence', 'one-time').lower()} income of ${income['amount']}" for income in data['income']])
    expense_details = " and ".join(
        [f"monthly expenses such as {expense['title'].lower()} costing ${expense['amount']}" for expense in data['expenses']])
    wishlist_details = " and ".join(
        [f"wishlist items like {item['title'].lower()} costing ${item['cost']}" for item in data['wishlist']])

    prompt = (
        f"Given I have {income_details}, {expense_details}, what specific budgeting advice do you suggest to manage my expenses and save for {wishlist_details}? Provide actionable recommendations in bullet point format, focusing on specific tools, strategies, and actions. Avoid general advice. Talk about my income, expenses, and wishlist items (include their names). Only consider the data provided."
    )
    return prompt


def filter_complete_points(text):
    points = text.split('\n')
    filtered_points = [
        point for point in points if point.strip().endswith('.')]
    complete_text = '\n'.join(filtered_points)
    return complete_text


def get_financial_insights(data):
    API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct"
    API_KEY = os.getenv('HF_API_KEY')
    headers = {"Authorization": f"Bearer {API_KEY}"}

    inputs = generate_prompt(data)

    payload = {
        "inputs": inputs,
        "parameters": {
            "return_full_text": False,
            "max_length": 1000,
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        output = response.json()
        generated_text = output[0].get(
            'generated_text', 'No insights generated.').strip()

        filtered_text = filter_complete_points(generated_text)

        return filtered_text
    else:
        return {'error': f'Failed to fetch financial insights, status code: {response.status_code}'}


def process_financial_data(data):
    insights = get_financial_insights(data)
    return {"insights": insights}
