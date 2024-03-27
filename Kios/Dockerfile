# FROM python:latest

# # ENV SERVER_IP=192.168.15.227

# WORKDIR /app

# RUN apt-get update && apt-get install -y libgl1-mesa-glx

# COPY requirement.txt ./
# RUN pip install --no-cache-dir -r requirement.txt
# COPY ./dist/index.html ./
# COPY app.py /app/app.py
# COPY process.py /app/process.py
# COPY . .

# EXPOSE 6970

# CMD [ "python","app.py","process.py"]

# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.12-slim

EXPOSE 6970

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
RUN pip install -r requirements.txt \
 && apt-get update && apt-get install -y libgl1 libglib2.0-0

WORKDIR /app
COPY . /app

# CMD ["gunicorn", "--bind", "0.0.0.0:6970", "-k", "uvicorn.workers.UvicornWorker", "Kios.app:app"]
CMD ["python","app.py","process.py"]
