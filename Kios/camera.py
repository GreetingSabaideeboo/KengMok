import cv2
camera = cv2.VideoCapture(0)  

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def detect_faces(frame):
    # Convert the frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Perform face detection
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

    # Draw rectangles around the detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    return frame

def gen_frames():
    while True:
        
        success, frame = camera.read()
        frame_with_faces = detect_faces(frame)
        
        try:
            cv2.imwrite('pic.jpg',frame_with_faces)
        except Exception as E:
            print (E)
        
 
gen_frames()