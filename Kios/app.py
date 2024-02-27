from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import os
from starlette.staticfiles import StaticFiles
from pathlib import Path
from fastapi.responses import HTMLResponse

HOST="localhost"
PORT=8080

app = FastAPI()
cam = cv2.VideoCapture(0)
origins = [r'^http://localhost($|:\d+$)']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True
)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')



def camera_stream():
    ret, frame = cam.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Perform face detection
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))
    try:
        cv2.imwrite('pic.jpg',frame)
    except Exception as E:
        print (E)
    # Draw rectangles around the detected faces
    for (x, y, w, h) in faces:
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
            print (E)
        

@app.get('/video_feed')
def video_feed():
    return StreamingResponse(gen_frame(),
                    media_type='multipart/x-mixed-replace; boundary=frame')

script_dir = os.path.dirname(os.path.realpath(__file__))
app.mount("/assets", StaticFiles(directory=Path(os.path.join(script_dir,"dist/assets")), html=True), name="assets")
@app.get('/')
async def index():
    try:
        sioClient.connect(SERVER_URL)
    except:
        pass
    file_path = os.path.join(script_dir, "dist/index.html")
    return HTMLResponse(content=open(file_path).read())


if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(app, host=HOST, port=PORT, log_level="info")
    except Exception as e:
        print(f"app runtime error : {e}")
        raise SystemExit