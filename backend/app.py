from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


def create_app():
    app = Flask(__name__)
    CORS(app)
    limiter = Limiter(
        get_remote_address,
        app=app,
        default_limits=["100 per day", "50 per hour"],
        storage_uri="memory://",
    )

    from routes import create_routes
    create_routes(app, limiter)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
