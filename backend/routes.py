from flask import request, jsonify
from services import get_financial_insights, process_financial_data


def create_routes(app):
    @app.route('/api/financial-insights', methods=['POST'])
    def financial_insights():
        data = request.json
        insights = process_financial_data(data)
        return jsonify(insights)
