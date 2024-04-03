from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.config import Config
import cv2

# Load environment variables
config = Config(".env")
CAMERA_FEED_URL = config("CAMERA_FEED_URL", cast=str)
EVENTS_API_URL = config("EVENTS_API_URL", cast=str)

app = FastAPI()

# Serve static files
app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

# Jinja2 Templates for HTML rendering
templates = Jinja2Templates(directory="dist")

# OpenCV setup for camera feed
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
cam = cv2.VideoCapture(0)

def gen_camera_stream():
    while True:
        ret, frame = cam.read()
        if not ret:
            break  # Failed to capture image
        frame = cv2.flip(frame, 1)  # Mirror the image
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4)
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(gen_camera_stream(), media_type='multipart/x-mixed-replace; boundary=frame')

@app.get("/", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "CAMERA_FEED_URL": CAMERA_FEED_URL, "EVENTS_API_URL": EVENTS_API_URL})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=config("HOST", cast=str, default="0.0.0.0"), port=config("PORT", cast=int, default=8000))
