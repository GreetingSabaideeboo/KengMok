import base64
import io
import cv2
# from imageio import imread


# filename = "../pic.jpg"
# with open(filename, "rb") as fid:
#     data = fid.read()
with open("../frame.jpg", "rb") as image_file:
    data = image_file.read()
b64_bytes = base64.b64encode(data)
b64_string = b64_bytes.decode()

# reconstruct image as an numpy array
img = cv2.imread(io.BytesIO(base64.b64decode(b64_string)))

# show image


# finally convert RGB image to BGR for opencv
# and save result
cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
cv2.imwrite("reconstructed.jpg", cv2_img)
