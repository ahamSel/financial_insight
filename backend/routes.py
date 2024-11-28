from flask import request, jsonify
from services import process_financial_data


def create_routes(app, limiter):
    @app.route('/api/financial-insights', methods=['POST'])
    @limiter.limit("10 per minute")
    def financial_insights():
        data = request.json
        insights = process_financial_data(data)
        return jsonify(insights)
