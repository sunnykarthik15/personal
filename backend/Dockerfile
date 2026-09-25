FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ backend/

EXPOSE 8000

# Run migrations and start production Uvicorn server
CMD ["sh", "-c", "python backend/migrate.py && uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --workers 4"]
