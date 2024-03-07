import cv2
import time
from deepface import DeepFace
import requests
import axios
import base64
import numpy as np
from numpy.linalg import norm


face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
tracker=[]
while True:
    try:
        ret, frame = cap.read()
        Time=time.time()
        ch = cv2.imread("./picture/hee.jpg")
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(200, 200))
        # print(faces)
        with open("./pic.jpg", "rb") as image_file:
            environmentEncoded_string = base64.b64encode(image_file.read())
            
        for (x, y, w, h) in faces:
            face = frame[y:y + h, x:x + w]
            embedding_objs = DeepFace.represent(img_path = face)
            embedding = embedding_objs[0]["embedding"]
            # print(embedding)
            count=0
            
            for idx, trac in enumerate(tracker):                    
                cosine = np.dot(embedding,trac['pic'])/(norm(embedding)*norm(trac['pic']))
                if (Time-trac['time'])>5:
                    tracker.pop(idx)
                    print("pop")
                    continue
                if cosine>0.8:
                    print('1')
                    trac['time']=Time

                    
                else:
                    print('2')
                    tracker.append({'pic':embedding,'time':Time})
                    
                    cv2.imwrite('face.jpg',face)
                    with open("./face.jpg", "rb") as image_file:
                        faceEncoded_string = base64.b64encode(image_file.read())
                    try:
                        url = 'http://localhost:5001/peopleList'
                        people_response = requests.get(url)
                        
                        url = 'http://localhost:5001/getPicture'
                        response = requests.get(url)
                        gender=DeepFace.analyze(frame,actions=("gender"))
                        gender=gender[0]['dominant_gender']
                        # print(gender)
                        if gender=='Man':
                            gender='Male'
                            
                        elif gender== 'Woman':
                            gender='Female'
                        
                        if response.status_code == 200:
                            data = response.json()
                            folders = data.get('folders', [])
                            minimumDistance=4
                            predictUID=None

                            for folder in folders:
                                folderName = folder.get('folderName')
            
            # for loop check gender
                                people_data = people_response.json()
            # เข้าถึงข้อมูลที่ต้องการ
                                people_list = people_data.get('peopleList', [])

                                for person in people_list:
                                    u_gender = person.get('U_Gender')
                                    if gender == u_gender:
                                        images = folder.get('images', [])
                                        predictID = person.get('UID')
                                        name=person.get('U_Firstname')
                                        lastname=person.get('U_Lastname')
                                        # print(f"folderName: {folderName}, predictID: {predictID}")

                                        if int(folderName) == predictID:
                                            # print(folderName, predictID)
                                            for image in images:
                                                imageName = image.get('imageName')
                                                imageBase64 = image.get('imageBase64')

                                                # แปลง base64 string เป็น binary data
                                                image_data = base64.b64decode(imageBase64)

                                                # แปลง binary data เป็น numpy array ของภาพ
                                                nparr = np.frombuffer(image_data, np.uint8)
                                                img_cv2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                                                Ver_result = DeepFace.verify(img_cv2, face, model_name="VGG-Face", enforce_detection=False)
                                                if Ver_result['distance']<minimumDistance:
                                                    minimumDistance=Ver_result['distance']
                                                    predictUID=predictID
                                                # if Ver_result['verified']:
                                                #     print(predictID,name,' ',lastname)
                        #save event here 
                        print(predictUID)             
                    except Exception as e:
                        print(f"Error: {e}")
                
                
                
                    
                    
                
                
            
                                        # print(Ver_result['verified'])?
                
                
                
                
                
                #for loop get user info
                # Ver_result = DeepFace.verify(ch, face, model_name="VGG-Face", enforce_detection=False)
                # print(Ver_result)
                # result=DeepFace.analyze(frame,actions=("gender"))
                # print(result)
                
                
                
                
                
                
                
                # environmentB64_string = environmentEncoded_string.decode() ใช้
                # faceB64_string = faceEncoded_string.decode() ใช้
                
                
                
                
                
                
                
                
                # url = 'http://localhost:5001/savePicKios'
                # myobj = {'image': environmentB64_string,
                #          'face':faceB64_string}
                # x = requests.post(url, json = myobj)

                # print(x.text)
               
                # time.sleep(5)
           
                # pass
            if len(tracker)==0:
                print('3')
                tracker.append({'pic':embedding,'time':Time})
                    
                cv2.imwrite('face.jpg',face)
                with open("./face.jpg", "rb") as image_file:
                    faceEncoded_string = base64.b64encode(image_file.read())
                try:
                    url = 'http://localhost:5001/peopleList'
                    people_response = requests.get(url)

                    url = 'http://localhost:5001/getPicture'
                    picture = requests.get(url)
                    
                    url = 'http://localhost:5001/getPicture'
                    response = requests.get(url)
                    gender=DeepFace.analyze(frame,actions=("gender"))
                    gender=gender[0]['dominant_gender']
                    # print(gender)
                    if gender=='Man':
                        gender='Male'
                        
                    elif gender== 'Woman':
                        gender='Female'
                    
                    if response.status_code == 200:
                        data = response.json()
                        folders = data.get('folders', [])
                        minimumDistance=4
                        predictUID=None
                        

                        for folder in folders:
                            folderName = folder.get('folderName')
        
        # for loop check gender
                            people_data = people_response.json()
        # เข้าถึงข้อมูลที่ต้องการ
                            people_list = people_data.get('peopleList', [])

                            for person in people_list:
                                u_gender = person.get('U_Gender')
                                if gender == u_gender:
                                    images = folder.get('images', [])
                                    predictID = person.get('UID')
                                    name=person.get('U_Firstname')
                                    lastname=person.get('U_Lastname')
                                    # print(f"folderName: {folderName}, predictID: {predictID}")

                                    if int(folderName) == predictID:
                                        # print(folderName, predictID)
                                        for image in images:
                                            imageName = image.get('imageName')
                                            imageBase64 = image.get('imageBase64')

                                            # แปลง base64 string เป็น binary data
                                            image_data = base64.b64decode(imageBase64)

                                            # แปลง binary data เป็น numpy array ของภาพ
                                            nparr = np.frombuffer(image_data, np.uint8)
                                            img_cv2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                                            Ver_result = DeepFace.verify(img_cv2, face, model_name="VGG-Face", enforce_detection=False)
                                            if Ver_result['distance']<minimumDistance:
                                                    minimumDistance=Ver_result['distance']
                                                    predictUID=predictID
                    print(predictUID)                        
                except Exception as e:
                    print(f"Error: {e}")
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
