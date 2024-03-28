FROM python:3.12-slim

ENV SERVER_IP=192.168.15.227
EXPOSE 6970

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Run the application
CMD ["python","process.py"]
