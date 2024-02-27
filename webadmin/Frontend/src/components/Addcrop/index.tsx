import React, { useState } from "react";
import Axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function Addcrop() {
  const [selectedFile, setSelectedFile]:any[] = useState(null);
  const [crop, setCrop]:any[] = useState({ unit: "%", width: 30, aspect: 1 });
  const [image, setImage]:any[] = useState(null);
  const [Firstname, setFirstname]:any[] = useState("");
  const [Lastname, setLastname]:any[] = useState("");
  const [Gender, setGender]:any[] = useState("");
  const [Birth, setBirth]:any[] = useState("");

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropChange = (newCrop:any) => {
    setCrop(newCrop);
  };

  const handleFileUpload = () => {
    if (selectedFile && image) {
      const canvas = document.createElement("canvas");
      const scaleX = image.width / selectedFile.width;
      const scaleY = image.height / selectedFile.height;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        const croppedImage = canvas.toDataURL("image/png");

        Axios.post("http://localhost:5001/add", {
          image: croppedImage,
          firstname: Firstname,
          lastname: Lastname,
          gender: Gender,
          birth: Birth,
        })
          .then((response) => {
            console.log("Image uploaded successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        console.error("Canvas context is null");
      }
    } else {
      console.error("No file selected or image is null");
    }
  };

  return (
    <div>
        <h1>AddCrop</h1>
      <input
        type="text"
        placeholder="Enter Firstname "
        onChange={(event) => {
          setFirstname(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Lastname "
        onChange={(event) => {
          setLastname(event.target.value);
        }}
      />
      <select
        value={Gender}
        onChange={(event) => setGender(event.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="Date"
        placeholder="Enter Birthday"
        onChange={(event) => {
          setBirth(event.target.value);
        }}
      />
      <input type="file" onChange={handleFileChange} />
      {/* {image && (
        <ReactCrop
          src={image}
          crop={crop}
          onChange={handleCropChange}
          onComplete={(crop) => handleCropChange(crop)}
        />
      )} */}
      <button onClick={handleFileUpload}>Add Member</button>
    </div>
  );
}

export default Addcrop;
