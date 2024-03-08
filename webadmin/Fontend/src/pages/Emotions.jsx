import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/emotion.css";
import Navbar from './Navbar';
import Axios from 'axios';

function Emotions () {
    let emotions;
    const emotionlist = () => [
        Axios.get("http://localhost:5001/emotionlist"
        ).then((Response) => {
            console.log(Response);
            emotions = Response.data.emotionlist
            show()
            console.log(emotions)
        }),
    ];

    document.body.style.overflow = "auto";

    const show = async () => {
        const listContainer = document.getElementById('List');
        for (const emotion of emotions) {
            
            const Emotion = document.createElement('li');
            const Text = document.createElement('li');
            const btnContainer = document.createElement('div');
            const emoedit = document.createElement('butedit-emo');
            const emodelete = document.createElement('butdelete-emo');
            
            btnContainer.classList.add('btn-container');
            emoedit.classList.add('butedit-emo');
            emodelete.classList.add('butdelete-emo');

            //edit button
            var eb = document.createElement("BUTTON");
            eb.id = emotion.emotions
            eb.addEventListener("click", () => check(emotion.emotions));
            eb.className = "edit-button";
            var te = document.createTextNode("Edit");
            eb.appendChild(te);

            //delete button
            var db = document.createElement("BUTTON");
            db.id = emotion.emotions
            db.addEventListener("click", () => Delete(emotion.emotions)); // อย่าลืมเพิ่มลบคน
            db.className = "delete-button";
            var td = document.createTextNode("Delete");
            db.appendChild(td);

            //add content to list
            Emotion.textContent = `Emotion : ${emotion.emotion}`;
            Text.textContent = `Text respone : ${emotion.text}`;

            //append list to list container
            listContainer?.appendChild(Emotion);
            listContainer?.appendChild(Text);
        }
    }
    const Delete = async (SoundsID) => {
        if (confirm("Are you sure you want to delete this emotion?") == true) {
          await Axios({
            method: 'delete',
            url: 'http://localhost:5001/deletesound',
            data: {
              condition: '0' // replace this with your actual condition for deletion
            }
          }).then((response) => {
            console.log(response.data);
            show();
          });
        }
      }


    return (
        <>
        <div className="container-emotion">
            <div className="second-box">
                <div className="top-emotion">Emotions</div>
                <div className="top-emotion">&nbsp;</div>
                <div className="top-emotion">Manager</div>
                <div className="space"></div>
                <Link to={"/addsound"} className="butaddsound">Add</Link>
                {/* <div className="space"> </div> */}
                <button onClick={emotionlist} className="butlistemo">List</button>
            </div> 
            
        </div>
        <ul id="List" className="list-emo"></ul>
        </>
    );
}

export default Emotions;