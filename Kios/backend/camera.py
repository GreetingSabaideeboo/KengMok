import cv2 


# define a video capture object 
# vid = cv2.VideoCapture(0) 

while(True): 
	# ret, frame = vid.read() 	
 	frame = cv2.imread("pic.jpg")
	cv2.imshow('frame', frame) 
	if cv2.waitKey(1) & 0xFF == ord('q'): 
		break

vid.release() 
cv2.destroyAllWindows() 
# app.py

# from flask import Flask, render_template
# from flask_socketio import SocketIO, emit
# import cv2
# import base64

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_secret_key'
# socketio = SocketIO(app)

# # ฟังก์ชันสำหรับการเปิดกล้องและส่งภาพไปยัง Frontend
# def video_stream():
#     cap = cv2.VideoCapture(0)
#     while True:
#         ret, frame = cap.read()
#         _, buffer = cv2.imencode('.jpg', frame)
#         frame_encoded = base64.b64encode(buffer)
#         socketio.emit('video_stream', frame_encoded.decode('utf-8'))
#         socketio.sleep(0.1)
        

# @app.route('/')
# def index():
#     return render_template('index.html')

# @socketio.on('connect')
# def handle_connect():
#     print('Client connected')

# if __name__ == '__main__':
#     socketio.start_background_task(target=video_stream)
#     socketio.run(app, debug=True)

