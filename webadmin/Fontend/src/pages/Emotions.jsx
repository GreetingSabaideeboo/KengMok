import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/emotion.css";
import Navbar from './Navbar';
import Axios from 'axios';
import Swal from 'sweetalert2';

function Emotions () {
    let emotions;
    const emotionlist = () => [
        Axios.get("http://localhost:6956/emotionlist"
        ).then((Response) => {
            console.log(Response);
            emotions = Response.data.emotionlist
            show()
            console.log(emotions)
        }),
    ];

    document.body.style.overflow = "auto";

    const show =  () => {
        const listContainer = document.getElementById('List');
        listContainer.innerHTML=""
        for (const emotion of emotions) {
            
            const Emotion = document.createElement('liemo');
            const Text = document.createElement('liemo');
            const btnContainer = document.createElement('div');
            // const emoedit = document.createElement('butedit-emo');
            const emodelete = document.createElement('butdelete-emo');
            const hr = document.createElement('hr');

            btnContainer.classList.add('btn-container');
            // emoedit.classList.add('butedit-emo');
            emodelete.classList.add('butdelete-emo');

            //edit button
            // var eb = document.createElement("BUTTON");
            // eb.id = emotion.emotions
            // eb.addEventListener("click", () => check(emotion.emotions));
            // eb.className = "emoedit-button";
            // var te = document.createTextNode("Edit");
            // eb.appendChild(te);

            //delete button
            var db = document.createElement("BUTTON");
            db.id = emotion.emotions
            db.addEventListener("click", () => Delete(emotion.SoundsID)); // อย่าลืมเพิ่มลบคน
            db.className = "emodelete-button";
            var td = document.createTextNode("Delete");
            db.appendChild(td);

            //add content to list
            Emotion.textContent = `Emotion : ${emotion.emotion}`;
            Text.textContent = `Text respone : ${emotion.text}`;

            //append list to list container
            
            listContainer?.appendChild(Emotion);
            listContainer?.appendChild(Text);
            // listContainer?.appendChild(eb);
            listContainer?.appendChild(db);
        }
    }
    const Delete = async (SoundsID) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Axios({
            method: 'post',
            url: 'http://localhost:6956/deletesound',
            data: {
              'SoundsID': SoundsID // replace this with your actual condition for deletion
            }
          }).then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            emotionlist();
          });
        }
      });
    };
      useEffect(()=>{
        emotionlist()
      })

    return (
        <>
        <div className="container-emotion">
            <div className="second-box">
                <div className="top-emotion">Emotions</div>
                <div className="top-emotion">&nbsp;</div>
                <div className="top-emotion">Manager</div>
                <div className="space"></div>
                <Link to={"/addsound"} className="butaddsound">Add text response</Link>
                {/* <div className="space"> </div> */}
                {/* <button onClick={emotionlist} className="butlistemo">List</button> */}
            </div> 
            
        </div>
        <div className="box-list">
            <ul id="List" className="list-emo"></ul>
        </div>
        </>
    );
}

export default Emotions;