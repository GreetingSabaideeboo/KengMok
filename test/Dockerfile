# กำหนดอิมเมจฐาน
FROM nginx:alpine

# ลบไฟล์เริ่มต้นของ Nginx
RUN rm /etc/nginx/conf.d/default.conf

# คัดลอกไฟล์คอนฟิก Nginx
COPY nginx.conf /etc/nginx/conf.d

# คัดลอกไฟล์ของเว็บไซต์ไปยังเว็บเซิร์ฟเวอร์
COPY . /usr/share/nginx/html

# เปิดพอร์ต 80
EXPOSE 80

# เริ่มต้น Nginx เมื่อคอนเทนเนอร์เริ่มทำงาน
CMD ["nginx", "-g", "daemon off;"]
