FROM python:latest

WORKDIR /app

RUN apt-get update && apt-get install -y libgl1-mesa-glx

RUN pip install fastapi uvicorn mysql-connector-python opencv-python-headless starlette pathlib jinja2
RUN pip install opencv-python
RUN pip install python-dotenv
RUN pip install deepface
RUN pip install requests
RUN pip install datetime
RUN pip install pyttsx3

COPY requirement.txt ./
RUN pip install --no-cache-dir -r requirement.txt

COPY . .

EXPOSE 8080

CMD [ "python","./app.py","./process.py" ]
