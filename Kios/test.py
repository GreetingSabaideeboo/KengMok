import cv2
import requests
import numpy as np
import json

# URL of the Flask server
camera = cv2.VideoCapture(0)  

def show_video():
    while True:
        try:
            success, frame = camera.read()
            # frame= cv2.imread('pic.jpg')
            cv2.imshow("Video Stream", frame)
        except Exception as E:
            print(E)
        # Request video stream from Flask server
        # response = requests.get(flask_url, stream=True)
        # print(response)

    #     if not response.ok:
    #         print("Error receiving video stream")
    #         break
        
    #     # Decode the image directly from response content
    #     frame = cv2.imdecode(np.frombuffer(response.content, np.uint8), -1)
        
    #     # Check for errors in decoding
    #     if frame is None:
    #         print("Error decoding frame")
    #         break

    #     # Display the frame
       

        # Exit on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cv2.destroyAllWindows()

if __name__ == "__main__":
    show_video()
