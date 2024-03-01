import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

// import NewCollectionCSS from './style/NewCollection.module.css';
// import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';



import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import 'cropperjs/dist/cropper.css';
import { useNavigate  } from "react-router-dom";

const Addcrop = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Gender, setGender] = useState("");
  const [Birth, setBirth] = useState("");
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);
  const navigate = useNavigate();

  const onCrop = () => {
    const imageElement = cropperRef.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas({
      width: 300, // Set the width of the cropped canvas
      height: 300, // Set the height of the cropped canvas
      minWidth: 100,
      minHeight: 100,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    }).toDataURL());
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
      { handleUpload }
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) {
      window.alert('Please select a file before uploading.');
      console.error('Please select a file.');
      return;
    }
  };


  // const createEmployeeDB = async () => {
  //   try {
  //     const res = await axios.post('http://localhost:3000/createEmployee', { name });
  //     console.log('create db successfully', res);
  //   }
  //   catch (err) {
  //     console.log('fail to create db', err.message);
  //   }
  // }

  // const createEmployeeFolder = async () => {
  //   // const formData = new FormData();
  //   // console.log(file);
  //   // formData.append('labels', file);
  //   // formData.append('folderName', folderName || 'defaultFolder');

  //   try {
  //     const { data } = await Axios.post('http://localhost:5001/add', { 
  //       image: croppedImage,
  //       firstname:Firstname,
  //       lastname:Lastname,
  //       gender:Gender,
  //       birth:Birth
  //   })
  //   
  //   } catch (error) {
  //     console.error('Error:', error.message || 'Failed to upload image.');
  //   }
  // }
  const savepic = async () => {
    try {
      console.log("active")
      const { data } = await axios.post('http://localhost:5001/add', { 
        image: croppedImage,
        firstname:Firstname,
        lastname:Lastname,
        gender:Gender,
        birth:Birth
    })
    console.log("activeee")
    window.alert('Add member sussessfully');
    navigate('/manage');
    } catch (error) {
      console.error('Error:', error.message || 'Failed to upload image.');
    }

  }


  return (
    <>

      <Container>
        <div style={{ marginTop: '50px' }} ></div>
        <input type="text" placeholder="Enter Firstname " onChange={(event) => { setFirstname(event.target.value); }} />
        <input type="text" placeholder="Enter Lastname " onChange={(event) => { setLastname(event.target.value); }} />
        <br />
        <select value={Gender} onChange={(event) => setGender(event.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <input type="Date" placeholder="Enter Birthday" onChange={(event) => { setBirth(event.target.value); }} />
        <br />
        <div id='kk'></div>
        <br/>
        <input type="file" onChange={handleFileChange} />
        <div></div>
        {/* <button onClick={handleUpload}>Upload</button> */}
        {image && (
          <Cropper
            src={image}
            style={{ height: '30%', width: '30% ' }}
            initialAspectRatio={1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
        )}

        {croppedImage && (
          <div>
            <h3>Cropped Image:</h3>
            <img src={croppedImage}
              // className={NewCollectionCSS.croppedImage}
              alt="Cropped" />
              <br/>
              <button onClick={savepic}>save</button>
          </div>
        )}
        
        
      </Container>
    </>
  );
};

export default Addcrop;