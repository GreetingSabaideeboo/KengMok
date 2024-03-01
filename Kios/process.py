import cv2
import time
from deepface import DeepFace
import requests
import axios
import base64

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

while True:
    try:
        frame = cv2.imread("pic.jpg")
        ch = cv2.imread("./picture/hee.jpg")
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(200, 200))
        with open("./pic.jpg", "rb") as image_file:
            environmentEncoded_string = base64.b64encode(image_file.read())
        for (x, y, w, h) in faces:
            face = frame[y:y + h, x:x + w]
            cv2.imwrite('face.jpg',face)
            with open("./face.jpg", "rb") as image_file:
                faceEncoded_string = base64.b64encode(image_file.read())
            try:
                #for loop
                Ver_result = DeepFace.verify(ch, face, model_name="VGG-Face", enforce_detection=False)
                print(Ver_result)
                environmentB64_string = environmentEncoded_string.decode()
                faceB64_string = faceEncoded_string.decode()
                url = 'http://localhost:5001/savePicKios'
                myobj = {'image': environmentB64_string,
                         'face':faceB64_string}


                x = requests.post(url, json = myobj)

                print(x.text)
               
                time.sleep(5)
            except Exception as e:
                # print(f"Error: {e}")
                pass
    except Exception as e:
        # print(f"Error: {e}")
        pass

    try:
        # Display the image
        cv2.imshow("Image", frame)

        # Wait for the user to press a key
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        # Introduce a delay of 5 seconds
        # time.sleep(5)
    except Exception as e:
        # print(f"Error: {e}54645644655564654")
        pass

# Close all windows
cv2.destroyAllWindows()
