# Real Estate Analyzer Backend

This backend exposes the real estate financial analysis engine via a FastAPI server.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the FastAPI server (with auto-reload for development):
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at http://localhost:8000

- Swagger docs: http://localhost:8000/docs
- Redoc docs: http://localhost:8000/redoc

## Endpoints

- `GET /` — Health check
- `POST /analyze` — Run scenario analysis (see docs for request format) 