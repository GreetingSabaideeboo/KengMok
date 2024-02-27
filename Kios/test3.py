import cv2
from deepface import DeepFace
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

while True:
    try:
        frame = cv2.imread("pic.jpg")
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(10, 10))
        for (x, y, w, h) in faces:
            face = frame[y:y + h, x:x + w]
            try:
                Ver_result = DeepFace.verify(face, face,model_name="VGG-Face", enforce_detection=False)
                print(Ver_result)
            except Exception as e:
                print(f"Error: {e}")
    except Exception as e:
                print(f"Error: {e}")






    try:
        # Display the image
        cv2.imshow("Image", frame)

        # Wait for the user to press a key
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    except Exception as e:
        print(f"Error: {e}54645644655564654")

# Close all windows
cv2.destroyAllWindows()
