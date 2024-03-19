import cv2
import time
from deepface import DeepFace
import requests
import axios
import random
import base64
import numpy as np
from numpy.linalg import norm
from datetime import datetime
import pyttsx3
import subprocess

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# cap = cv2.VideoCapture(0)
tracker=[]

try:
    url = 'http://localhost:6956/peopleList'
    people_response = requests.get(url)
    
    url = 'http://localhost:6956/getPicture'
    response = requests.get(url)
    
except Exception as e:
    print(e)
    

# for mac
# def makeSound(name,emo):
#     print("emotion recive:",emo)
   
#     url = 'http://localhost:5001/getSound'
#     myobj = {'emotion': emo}
#     response = requests.post(url, json=myobj)
#     text=""
#     if response.status_code == 200:
#         data = response.json()
#         lenEmotion = len(data)
        
#         if lenEmotion > 0:
#             num = random.randint(0, lenEmotion - 1)
#             text = data[num]['text']
#             print(text)
#         else:
#             print("Error: No data received from the API")
#     else:
#         print(f"Error: {response.status_code}")
    
    
#     greeting = "sa wad dee krub "  +name +text
#     subprocess.call(['say', greeting])

#for windows
engine = pyttsx3.init()
TH_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_THAI"
engine.setProperty('volume', 0.9)  # Volume 0-1
engine.setProperty('rate', 120)  #148
engine.setProperty('voice', TH_voice_id)
def makeSound(name,emo):
    print("emotion recive:",emo)
   
    url = 'http://localhost:6956/getSound'
    myobj = {'emotion': emo}
    response = requests.post(url, json=myobj)
    text=""
    if response.status_code == 200:
        data = response.json()
        lenEmotion = len(data)
        
        if lenEmotion > 0:
            num = random.randint(0, lenEmotion - 1)
            # print("ข้อมูลapi",data)
            text = data[num]['text']
            # print("สุ่มคำทักทาย")
        else:
            print("Error: No data received from the API")

        print("ทักทาย",text)
    else:
        print(f"Error: {response.status_code}")
    
    
    greeting = "สวัสดีวันอังคารอันโหดร้ายครับ"  +name +text
    engine.say(greeting)
    engine.runAndWait()
    # subprocess.call(['say', greeting])
    
def calculate_age(birthday_str):
    """Calculate age given a birthday."""
    birthday = datetime.strptime(birthday_str, '%Y-%m-%d')
    current_date = datetime.now()
    age = current_date.year - birthday.year - ((current_date.month, current_date.day) < (birthday.month, birthday.day))
    return age

def saveEvent(UID, gender, age, emotion, environmentEncoded_string, faceEncoded_string,Time):
    """Find a person by UID and do something with their information."""
    name=""
    
    try:
        if UID!=None:
            people = people_response.json()
            for person in people['peopleList']:
                if person['UID'] == UID:
                    name=person['U_Firstname']
                    age = calculate_age(person['U_Birthday'])
                    makeSound(name,emotion)        
        else:
            UID="0"
            makeSound(name,emotion)   
            age=age[0]['age']
            # print(age)
            name="stranger"
    except Exception as e:
        print(e)
    # print(name)
    print("age:",age)
    # makeSound(name,emotion)           
    environmentB64_string = environmentEncoded_string.decode() 
    faceB64_string = faceEncoded_string.decode() 
    # print(UID,gender,age,emotion,environmentB64_string,faceB64_string)
    url = 'http://localhost:6956/savePicKios'
    myobj = {'image': environmentB64_string,
                'face':faceB64_string,
                'uid':UID,
                'gender':gender,
                'age':age,
                'emotion':emotion,
                'time':Time
                }
    x = requests.post(url, json = myobj)

while True:
    try:
       
        # ret, frame = cap.read()
        frame=cv2.imread("pic.jpg")
        frame = cv2.flip(frame, 90) 
        # frame = cv2.imread("pic.jpg")
        Time=time.time()
        current_time = datetime.now()
        
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(100, 100))
        # print(faces)
        cv2.imwrite('frame.jpg',frame)
        with open("./frame.jpg", "rb") as image_file:
            environmentEncoded_string = base64.b64encode(image_file.read())
            
        for (x, y, w, h) in faces:
            face = frame[y:y + h, x:x + w]
            embedding_objs = DeepFace.represent(img_path = face)
            embedding = embedding_objs[0]["embedding"]
            # print(embedding)
            count=0
            
            for idx, trac in enumerate(tracker):              
                # print(embedding,trac['pic'])      
                cosine = np.dot(embedding,trac['pic'])/(norm(embedding)*norm(trac['pic']))
                if (Time-trac['time'])>10:
                    tracker.pop(idx)
                    print("pop")
                    continue
                if cosine>0.4:
                    print('1')
                    trac['time']=Time

                    
                else:
                    print('2')
                    tracker.append({'pic':embedding,'time':Time})
                    
                    cv2.imwrite('face.jpg',face)
                    with open("./face.jpg", "rb") as image_file:
                        faceEncoded_string = base64.b64encode(image_file.read())
                    try:
                        
                        analyze=DeepFace.analyze(frame,actions=("gender","emotion"))
                        gender=analyze[0]['dominant_gender']
                        emotion=analyze[0]['dominant_emotion']
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
                                                if Ver_result['verified']==True:
                                                    if Ver_result['distance']<minimumDistance:
                                                        minimumDistance=Ver_result['distance']
                                                        predictUID=predictID
                                                    # print(Ver_result)
                        #save event here 
                        if predictUID!=None:
                            current_time_iso = current_time.strftime("%Y-%m-%d %H:%M:%S")
                            saveEvent(predictUID, gender, 0, emotion, environmentEncoded_string, faceEncoded_string, current_time_iso)
                            print(predictUID,emotion)      
                        else:
                            age=DeepFace.analyze(frame,actions=("age"))
                            current_time_iso = current_time.strftime("%Y-%m-%d %H:%M:%S")
                            saveEvent(predictUID, gender, age, emotion, environmentEncoded_string, faceEncoded_string, current_time_iso)
                            print("stranger",emotion)                
                    except Exception as e:
                        print(f"Error: {e}")
                
                
                
                    
                    
                
                
            
                                        # print(Ver_result['verified'])?
                
                
                
                
                
                #for loop get user info
                # Ver_result = DeepFace.verify(ch, face, model_name="VGG-Face", enforce_detection=False)
                # print(Ver_result)
                # result=DeepFace.analyze(frame,actions=("gender"))
                # print(result)
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
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
                    url = 'http://localhost:6956/peopleList'
                    people_response = requests.get(url)

                    url = 'http://localhost:6956/getPicture'
                    picture = requests.get(url)
                    
                    url = 'http://localhost:6956/getPicture'
                    response = requests.get(url)
                    analyze=DeepFace.analyze(frame,actions=("gender","emotion"))
                    gender=analyze[0]['dominant_gender']
                    emotion=analyze[0]['dominant_emotion']
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
                                            
                                            if Ver_result['verified']==True:
                                                if Ver_result['distance']<minimumDistance:
                                                    minimumDistance=Ver_result['distance']
                                                    predictUID=predictID
                                                # print(Ver_result)
                    
                    if predictUID!=None:
                        current_time_iso = current_time.strftime("%Y-%m-%d %H:%M:%S")
                        saveEvent(predictUID, gender, 0, emotion, environmentEncoded_string, faceEncoded_string, current_time_iso)
                        print(predictUID,emotion)      
                    else:
                        age=DeepFace.analyze(frame,actions=("age"))
                        current_time_iso = current_time.strftime("%Y-%m-%d %H:%M:%S")
                        saveEvent(predictUID, gender, age, emotion, environmentEncoded_string, faceEncoded_string, current_time_iso)

                        print("stranger",emotion)                 
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
