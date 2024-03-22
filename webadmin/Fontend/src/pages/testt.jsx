import React, { createContext, createElement } from "react";
import { Link } from "react-router-dom";
import "../css/emotion.css"
import Axios from "axios";
import { useEffect } from "react";
import Addsound from "./Addsound";
import Swal from "sweetalert2";

function Emotions () {
    let emotions;
    const emotionlist = () => [
        Axios.get("http://localhost:6956/emotionlist").then((Response) => {
            console.log(Response); 
            emotions = Response.data.emotionlist
            show()
            console.log(emotions)
        }),
    ];
    
    const show = () => {
        const listContainer = document.getElementById('List');
        listContainer.innerHTML=""
        for (const emotion of emotions) {
            const Emotion = document.createElement('liemo');
            const Text = document.createElement('liemo');
            const btnContainer = document.createElement('div');
            const deleteemotion = document.createElement('butdelete-emo');

            btnContainer.classList.add('btn-container');
            deleteemotion.classList.add('butdelete-emo');

            var debut = document.createElement("BUTTON");
            debut.id = emotion.emotions
            debut.addEventListener("click", () => Delete(emotion.SoundsID)); // อย่าลืมเพิ่มลบคน
            debut.className = "emodelete-button";
            var td = document.createTextNode("Delete");
            debut.appendChild(td);

            Emotion.textContent = `Emotion : ${emotion.emotion}`;
            Text.textContent = `Text respone : ${emotion.text}`;

            listContainer?.appendChild(Emotion);
            listContainer?.appendChild(Text);
            listContainer?.appendChild(debut);
        }
    };
    
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
                'SoundsID': SoundsID
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
                <div className="top-emotion">Emotions manager</div>
                <button Link="./Addsound"className="butaddsound">Add text response</button>
            </div>
        </div>
        <div className="box-list">
            <ul id="List" className="list-emo"></ul>
        </div>
        </>
    
    );
    
}

export default Emotions;