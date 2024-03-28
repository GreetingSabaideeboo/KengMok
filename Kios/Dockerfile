# FROM python:latest

# # ENV SERVER_IP=192.168.15.227

# WORKDIR /app

# RUN apt-get update && apt-get install -y libgl1-mesa-glx

# COPY requirement.txt ./
# RUN pip install --no-cache-dir -r requirement.txt
# COPY ./dist/index.html ./
# COPY app.py /app/app.py
# COPY process.py /app/process.py
# COPY . .

# EXPOSE 6970

# CMD [ "python","app.py","process.py"]

FROM python:3.12-slim

ENV SERVER_IP=192.168.15.227
# Expose the port
EXPOSE 6970

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install required system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 \
        libgl1-mesa-glx \  # Add libgl1-mesa-glx for graphics libraries


# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Run the application
CMD ["python", "app.py", "process.py"]

