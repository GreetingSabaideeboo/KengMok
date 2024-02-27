from deepface import DeepFace

result=DeepFace.analyze("./picture/pic4.jpg",actions=("emotion"))
print(result[0]['dominant_emotion'])