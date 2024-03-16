import React, { useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Cropper from 'react-cropper';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import 'cropperjs/dist/cropper.css';
import { useNavigate } from "react-router-dom";
import "../css/add.css";
import Swal from 'sweetalert2';

const Addcrop = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Gender, setGender] = useState("");
  const [Birth, setBirth] = useState("");
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState('');
  // const [image, setImage] = useState(null);
  const [image, setImage] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const cropperRefs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
  }, [image]);

  const onCrop = (index) => {
    const imageElement = cropperRefs.current[index];
    const cropper = imageElement?.cropper;
    const croppedDataURL = cropper.getCroppedCanvas({
      width: 300,
      height: 300,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    }).toDataURL();

    // Update the specific cropped image by index
    setCroppedImages(prev => {
      const updatedCroppedImages = [...prev];
      updatedCroppedImages[index] = croppedDataURL;
      return updatedCroppedImages;
    });
  };


  const handleFileChange = (event) => {
    const files = event.target.files;
    var img = [];

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };

    const readFiles = async () => {
      for (const file of files) {
        try {
          const dataURL = await readFile(file);
          img.push(dataURL);
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }

      setImage(img);
    };

    readFiles();
    // console.log(image)
  };

  // const handleUpload = async () => {
  //   if (!croppedImage) {
  //     window.alert('Please select a file before uploading.');
  //     console.error('Please select a file.');
  //     return;
  //   }
  // };

  const savepic = async () => {
    // Ensure all required information is provided
    // if (!Firstname || !Lastname || !Gender || !Birth || croppedImages.length === 0) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Can't Submit",
    //     text: "Please enter all informations.",
    //   });

    // } else {
    //   Swal.fire({
    //     title: "Good job!",
    //     text: "Submit Successfully!",
    //     icon: "success",
    //   });
    // }
    Swal.fire({
        title: "Good job!",
        text: "Edit Successfully!",
        icon: "success",
      });
    console.log(croppedImages)
    try {
      // Example of how you might handle multiple images - adjust according to your backend needs
      
        await axios.post('http://localhost:5001/add', {
          image: croppedImages,
          firstname: Firstname,
          lastname: Lastname,
          gender: Gender,
          birth: Birth
        });
      
  
      // window.alert('Add member successfully');
      navigate('/manage');
    } catch (error) {
      console.error('Error:', error.message || 'Failed to upload image(s).');
    }
  };
  


  return (
    <>
      <div>
        <div className="topadd">EDIT STUDENT</div>
        <body className="container">
          <div className="loginbackground">
            <div style={{ marginTop: '50px' }} ></div>
            <div className="name">
              <input className="fname" type="text" placeholder="Enter Firstname " onChange={(event) => { setFirstname(event.target.value); }} />
              <input className="lname" type="text" placeholder="Enter Lastname " onChange={(event) => { setLastname(event.target.value); }} />
            </div>
            <br />
            <div className="gendate">
              <select className="gender" value={Gender} onChange={(event) => setGender(event.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <br />
              <input className="date" type="Date" placeholder="Enter Birthday" onChange={(event) => { setBirth(event.target.value); }} />
            </div>
            <br />
            <div className="select">
              <input type="file" onChange={handleFileChange} multiple />
            </div>
            <div className="pic-container" id="crop-img-container">
              {image.map((img, index) => (
                <div className="pic" key={index}>
                  <Cropper
                    src={img}
                    className="crop"
                    initialAspectRatio={1}
                    guides={false}
                    crop={() => onCrop(index)}
                    ref={(el) => cropperRefs.current[index] = el}
                  />
                </div>
              ))}
              <button className="butadd" onClick={savepic}>Save</button>
              <button><Link to="/manage" className="butback">Back</Link></button>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};

export default Addcrop;
