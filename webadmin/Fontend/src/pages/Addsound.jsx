import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/addsound.css";
import Swal from "sweetalert2";

const Addsound = () => {
  const [emotion, setemotion] = useState("happy");
  const [text, settext] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emotion || !text) {
      Swal.fire({
        icon: "error",
        title: "Can't Submit",
        text: "Please enter both informations.",
      });
      let timerInterval;

      // window.alert('Please enter both emotion and text.')
      return;
    } else {
      Swal.fire({
        title: "Good job!",
        text: "Submit Successfully!",
        icon: "success",
      });
      
    }

    axios
      .post("http://localhost:5001/addemotion", {
        emotion: emotion,
        text: text,
      })
      .then((response) => {
        // window.alert('Add emotion response successfully :)');
        navigate("/emotions");
      })
      .catch((error) => {
        // window.alert('Add emotion response unsuccessfully :(');
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <div className="top-emo">ADD EMOTION</div>
      <div className="box-addsound">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="emotion" className="emo">
              Select emotion
            </label>
            <select
              className="box-emo"
              id="emotion"
              value={emotion}
              onChange={(e) => setemotion(e.target.value)}
            >
              <option value="happy" className="happy">
                Happy
              </option>
              <option value="natural">Natural</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="fear">Fear</option>
            </select>
          </div>
          <div class="form-group">
            {/* <label for="text" className='text'>Text</label> */}
            <textarea
              className="box-text"
              id="text"
              rows="4"
              placeholder="Enter your respone text :)"
              value={text}
              onChange={(e) => settext(e.target.value)}
            ></textarea>
          </div>
          <div class="box-button">
            <button type="submit" className="butsubmit">
              Submit
            </button>

            <Link to="/emotions" className="butbackemo">
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addsound;
