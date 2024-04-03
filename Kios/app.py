from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.config import Config
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")
templates = Jinja2Templates(directory="dist")

# global latest_frame

class ImageData(BaseModel):
    image: str

@app.post("/capture")
async def capture_image(data: ImageData):
    
    # ถอดรหัสข้อมูลภาพจาก base64 กลับเป็น bytes
    img_data = base64.b64decode(data.image)
    # แปลง bytes กลับเป็น numpy array
    nparr = np.frombuffer(img_data, np.uint8)
    # แปลง numpy array เป็นภาพ
    latest_frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print("Picture:",latest_frame)
    # บันทึกภาพลงในไฟล์ pic.jpg บนเครื่อง โดยเขียนทับไฟล์เดิม
    cv2.imwrite('pic.jpg', latest_frame)
    
    return {"message": "Image received and saved as pic.jpg"}


def gen_camera_stream():
    
    while True:
        # # print("Picture:",latest_frame)
        # if latest_frame is not None:
        frame=cv2.imread('../pic.jpg')
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        # else:
        #     yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + b'\r\n')

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(gen_camera_stream(), media_type='multipart/x-mixed-replace; boundary=frame')

@app.get("/", response_class=HTMLResponse)
async def get_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=6969)
