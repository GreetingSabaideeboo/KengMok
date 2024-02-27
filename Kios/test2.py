import cv2
from deepface import DeepFace

import os
import time
import subprocess

cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_SIMPLEX 
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
fontScale = 1
color = (255, 255, 255)  
thickness = 2

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(100, 100))

    for (x, y, w, h) in faces:
        # Extract the detected face region
        face = frame[y:y + h, x:x + w]

        # Perform face verification
        try:
            Ver_result = DeepFace.verify("./picture/ohm.jpeg", face,model_name="VGG-Face", enforce_detection=False)
            result=DeepFace.analyze(frame,actions=("emotion","gender"))
            # resulte=DeepFace.analyze(face,actions=("emotion"))
            # Print the result3
            # print("Verification result:", Ver_result["verified"])
            # print("Distance:", result["distance"])
            # print("Model:", result["model"])
            # print(result[0]['dominant_emotion'])
            # print(result[0]['dominant_gender'])
            # print(result)

            # Draw a rectangle around the detected face
            
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            text = f"Verified: {Ver_result['verified']}"
            cv2.putText(frame, text, (x, y - 10), font, fontScale, color, thickness, cv2.LINE_AA)

            text_emotion = f"Emotion: {result[0]['dominant_emotion']}"
            cv2.putText(frame, text_emotion, (x, y + h + 20), font, fontScale, color, thickness, cv2.LINE_AA)

            text_gender = f"Gender: {result[0]['dominant_gender']}"
            cv2.putText(frame, text_gender, (x, y + h + 40), font, fontScale, color, thickness, cv2.LINE_AA)
            
            # เสียง
            subprocess.call(["say","Hello"])
            
        except ValueError as e:
            print(f"Error: {e}")

    cv2.imshow('Face Verification', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()