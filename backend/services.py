import requests
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()


def format_date(date_str):
    date_obj = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.000Z")
    return date_obj.strftime("%Y-%b-%d")


def generate_prompt(data):
    current_date = datetime.now().strftime('%Y-%b-%d')

    income_details = "; ".join([
        f"{income['title']} ({income.get('recurrence', 'one-time')}) of ${income['amount']} on {format_date(income['date'])}"
        for income in data['income']
    ])
    expense_details = "; ".join([
        f"{expense['title']} costing ${expense['amount']} on {format_date(expense['date'])}"
        for expense in data['expenses']
    ])
    wishlist_details = "; ".join([
        f"{item['title']} costing ${item['cost']}, desired by {format_date(item['desiredDate'])}"
        for item in data['wishlist']
    ])

    prompt = (
        f"As of {current_date}, given the financial data: \n"
        f"Incomes: {income_details}\n"
        f"Expenses: {expense_details}\n"
        f"Wishlist: {wishlist_details}\n"
        "Provide specific, actionable budgeting and savings advice in simple text (avoid Markdown formatting), formatted as bullet points. "
        "Include all provided details for personalized insights. All points should be directly about the data provided."
    )
    return prompt


def filter_complete_points(text):
    points = text.split('\n')
    filtered_points = []
    for point in points:
        trimmed_point = point.strip()
        condensed_point = ' '.join(trimmed_point.split())
        if condensed_point.endswith('.'):
            filtered_points.append(condensed_point)
    complete_text = '\n'.join(filtered_points)
    return complete_text


def get_financial_insights(data):
    API_URL = "https://api.openai.com/v1/chat/completions"
    API_KEY = os.getenv('OPENAI_API_KEY')
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = generate_prompt(data)

    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a financial advisor providing specific, actionable advice on budgeting, savings, and expense management. Focus on practical tips and clear recommendations tailored to the user's financial data, including income, expenses, and wishlist items. Avoid generic advice and ensure all suggestions are directly applicable and beneficial to the user's financial goals."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max_tokens": 200,
        "temperature": 0.7,
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        output = response.json()
        generated_text = output['choices'][0]['message']['content'].strip()

        filtered_text = filter_complete_points(generated_text)

        return filtered_text
    else:
        error_message = f'Failed to fetch financial insights, status code: {response.status_code}'
        if response.status_code == 401:
            error_message += ". Check if the API Key is correctly set."
        elif response.status_code == 429:
            error_message += ". API rate limit exceeded."
        return {'error': error_message}


def process_financial_data(data):
    insights = get_financial_insights(data)
    return {"insights": insights}
