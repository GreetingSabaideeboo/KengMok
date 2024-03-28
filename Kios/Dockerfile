# FROM python:3.11.7

# EXPOSE 6969

# RUN apt-get update && apt-get install -y --no-install-recommends \
#     libgl1 \
#     libglib2.0-0 \
#     libgl1-mesa-glx \
#     && rm -rf /var/lib/apt/lists/*

# COPY requirements.txt .
# RUN pip install -r requirements.txt

# WORKDIR /app

# COPY . /app

# CMD ["python", "app.py"]


FROM python:3.11.7

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 6969

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "6969"]

