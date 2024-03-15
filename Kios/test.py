import pyttsx3

engine = pyttsx3.init()

# ใช้ raw string สำหรับ path
TH_voice_id = r"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_THAI"

engine.setProperty('volume', 0.9)  # กำหนดระดับเสียง 0-1
engine.setProperty('rate', 120)  # กำหนดความเร็วในการพูด

engine.setProperty('voice', TH_voice_id)  # กำหนด voice ID เพื่อใช้งานเสียงภาษาไทย
engine.say('กินข้าวหรือยัง')

engine.runAndWait()
