import sys
import cv2
import time
import imutils
import numpy as np
import dlib

# Load the pre-trained Haar Cascade face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# initialize the camera and grab a reference to the raw camera capture
RES_W = 640
RES_H = 480

# Create a VideoCapture object and read from input file
# If the input is the camera, pass 0 instead of the video file name
cap = cv2.VideoCapture(0)

# allow the camera to warm up
time.sleep(0.1)

frame_count = 0

trackers = []

# Check if camera opened successfully
if not cap.isOpened():
    print("Error opening video stream or file")

# Read until video is completed
while cap.isOpened():
    # Capture frame-by-frame
    ret, frame = cap.read()
    if ret:
        frame = imutils.resize(frame, width=RES_W, height=RES_H)
        image = frame

        # loop over frames from the video stream
        # grab the raw NumPy array representing the image, then initialize the timestamp
        # and occupied/unoccupied text
        image_cpy = np.copy(image)  # Create copy since can't modify orig

        if image_cpy is None:
            break

        # start the frames per second throughput estimator
        t1 = time.time()
        gray = cv2.cvtColor(image_cpy, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        if len(faces)==0:
            print("not detect")
            frame_count = 0
        else:
            if frame_count == 0:
                # Use Haar Cascade to detect faces
                

                # Loop through faces and overlay green bounding boxes
                for (x, y, w, h) in faces:
                    cv2.rectangle(image_cpy, (x, y), (x + w, y + h), (0, 255, 0), 3)

                    # Initialize the tracker on the first frame
                    tracker = dlib.correlation_tracker()
                    rect = dlib.rectangle(x, y, x + w, y + h)
                    tracker.start_track(image_cpy, rect)

                    # Add the tracker to our list of trackers
                    trackers.append(tracker)
                    print(frame_count)

            else:
                print(frame_count)
                # Track faces using the correlation tracker
                for tracker in trackers:
                    tracker.update(image_cpy)
                    pos = tracker.get_position()

                    # Unpack the position object
                    startX = int(pos.left())
                    startY = int(pos.top())
                    endX = int(pos.right())
                    endY = int(pos.bottom())

                    # Draw bounding box
                    cv2.rectangle(image_cpy, (startX, startY), (endX, endY), (0, 255, 0), 3)

            frame_count += 1
        
        
        
        

        cv2.imshow('frame', image_cpy)
        key = cv2.waitKey(1) & 0xFF

        # if the 'q' key was pressed, break from the loop
        if key == ord("q"):
            break

    else:
        break

print('Finished processing')
# When everything done, release the video capture object
cap.release()

# Closes all the frames
cv2.destroyAllWindows()
