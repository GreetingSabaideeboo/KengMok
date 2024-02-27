import React, { useState } from "react";
import Axios from "axios";

function Addcrop() {
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
      <input type="text" placeholder="Enter Firstname " onChange={(event) => {setFirstname(event.target.value);}}/>
      <input type="text" placeholder="Enter Lastname " onChange={(event) => {setLastname(event.target.value);}}/>
      <select value={Gender} onChange={(event) => setGender(event.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="Date" placeholder="Enter Birthday" onChange={(event) => {setBirth(event.target.value);}}/>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Add Member</button>
    </div>
  );
}

export default Addcrop;
