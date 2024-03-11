import requests
import random
url = 'http://localhost:5001/getSound'
myobj = {'emotion': 'natural'}
response = requests.post(url, json=myobj)

if response.status_code == 200:
    data = response.json()
    lenEmotion=len(data)
    num=random.randint(0,0)
    text = data[num]['text']
    
    print(num)
else:
    print(f"Error: {response.status_code}")


# ตรวจสอบว่าการเรียก API สำเร็จหรือไม่
# if people_response.status_code == 200:
#     # แปลง JSON response เป็น Python object
#     people_data = people_response.json()

#     # เข้าถึงข้อมูลที่ต้องการ
#     people_list = people_data.get('peopleList', [])

#     for person in people_list:
#         print(person)

# else:
#     print(f'Failed to get data. Status code: {people_response.status_code}')
