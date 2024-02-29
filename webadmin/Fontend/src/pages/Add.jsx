import React, { useState } from "react";
import Axios from "axios";

function Add() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Gender, setGender] = useState("");
  const [Birth, setBirth] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        Axios.post('http://localhost:5001/add', { 
          image: base64String,
          firstname:Firstname,
          lastname:Lastname,
          gender:Gender,
          birth:Birth
      })

          .then(response => {
            console.log('Image uploaded successfully:', response.data);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
      };

      reader.readAsDataURL(selectedFile);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
     
    </div>
  );
}

export default Add;
