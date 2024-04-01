FROM python:3.11.7

EXPOSE 6970

RUN apt-get update && apt-get install -y \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1-mesa-glx \
    espeak \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get install espeak

COPY requirements.txt .
RUN pip install -r requirements.txt

RUN pip install deepface

RUN pip install requests pyttsx3

WORKDIR /app

COPY . /app

# Run the application
CMD ["python","process.py"]



