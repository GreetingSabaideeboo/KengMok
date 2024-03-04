import requests

url = 'http://localhost:5001/peopleList'
people_response = requests.get(url)

# ตรวจสอบว่าการเรียก API สำเร็จหรือไม่
if people_response.status_code == 200:
    # แปลง JSON response เป็น Python object
    people_data = people_response.json()

    # เข้าถึงข้อมูลที่ต้องการ
    people_list = people_data.get('peopleList', [])

    for person in people_list:
        u_gender = person.get('U_Gender')
        print(f'U_Gender: {u_gender}')

else:
    print(f'Failed to get data. Status code: {people_response.status_code}')
