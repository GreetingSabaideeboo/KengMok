from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
from cv2 import cvtColor
import mysql.connector
import os
from starlette.staticfiles import StaticFiles
from pathlib import Path
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

# HOST="localhost"
HOST="0.0.0.0"
# HOST="db"
PORT=6969
templates = Jinja2Templates(directory="dist")
app = FastAPI()
cam = cv2.VideoCapture(0)
# origins = [r'^http://localhost($|:\d+$)']
origins = [r'^http://0.0.0.0($|:\d+$)']


face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def camera_stream():
    ret, frame = cam.read()
    frame = cv2.flip(frame, 90) 
    gray = cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Perform face detection
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(100, 100))
    try:
        pass
        cv2.imwrite('pic.jpg',frame)
    except Exception as E:
        # print (E)
        pass
    # Draw rectangles around the detected faces
    for (x, y, w, h) in faces:
        # x+=75
        # y+=75
        # w-=100
        # h-=100
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    return cv2.imencode('.jpg', frame)[1].tobytes()

def gen_frame():
    while True:
        try:
            frame = camera_stream()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n') 
        except Exception as e:
            print(f"gen frame error : {e}")
        try:
            cv2.imwrite('pic.jpg',frame)
        except Exception as E:
            pass
            # print (E)
        

@app.get('/video_feed')
def video_feed():

    return StreamingResponse(gen_frame(),
                    media_type='multipart/x-mixed-replace; boundary=frame')

script_dir = os.path.dirname(os.path.realpath(__file__))
app.mount("/assets", StaticFiles(directory=Path(os.path.join(script_dir,"dist/assets")), html=True), name="assets")
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    # events = get_latest_events()
    
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(app, host=HOST, port=PORT, log_level="info")
    except Exception as e:
        print(f"app runtime error : {e}")
        raise SystemExit