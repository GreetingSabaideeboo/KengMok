import React from "react";

import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from "axios";
import axios from "axios";
function Works() {
  let people;
  const peopleList = () => [
    Axios.get("http://localhost:5001/peopleList"
    ).then((Response) => {
      people = Response.data.peopleList
      Show()
      console.log(people)
    }),
  ];



  const Show = async () => {
    // try {
    //   const { data } = await axios.get('http://localhost:5001/getPicture');
    //   const imageBase64 = data.folders[3].images[0].imageBase64;

    //   const space = document.getElementById('pic');
    //   const pic = document.createElement('img');

    //   // Use the base64 data as a data URL
    //   pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;

    //   space.appendChild(pic);
    // } catch (error) {
    //   console.error('Error fetching image:', error);
    // }
    const listContainer = document.getElementById('List');
    const { data } = await axios.get('http://localhost:5001/getPicture');
    // const imageBase64 = data.folders[3].images[0].imageBase64;
    
    // console.log(people.map((x:any)=>x))
    for (const person of people) {

      // Create a new list item
      const pic = document.createElement('img');
      const Firstname = document.createElement('li');
      const Lastname = document.createElement('li');
      const Gender = document.createElement('li');
      const Birthday = document.createElement('li');
      const hr = document.createElement('hr');
      var x = document.createElement("BUTTON");
      x.id = person.UID
      pic.src='./team.png'
      for (const uid of data.folders){
        if (uid.folderName==person.UID){
          
          console.log(uid)
          // console.log(uid.images[0].imageBase64)
          
          // const imageBase64 = uid.images[0].imageBase64;
          // pic.src = `data:${uid.images[0].mimeType};base64,${imageBase64}`;
          // pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;

        }
      }
      // pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;

      x.addEventListener("click", () => check(person.UID)); // Modify this line
      var t = document.createTextNode("Edit");
      x.appendChild(t);

      // Add content to the list item
      Firstname.textContent = `Firstname: ${person.U_Firstname}`;
      Lastname.textContent = `Lastname: ${person.U_Lastname}`;
      Gender.textContent = `Gender: ${person.U_Gender}`;
      Birthday.textContent = `Birthday: ${person.U_Birthday}`;

      // Append the list item to the list container
      listContainer?.appendChild(pic)
      listContainer?.appendChild(Firstname);
      listContainer?.appendChild(Lastname);
      listContainer?.appendChild(Gender);
      listContainer?.appendChild(Birthday);
      listContainer?.appendChild(x);
      listContainer?.appendChild(hr);
    }
  } 


  const check = (UID) => {
    //เดี๋ยวต้องโยนไปหน้าEditที่ยังไม่สร้าง
  }
  // peopleList()
  // Show()
  return (
    <body>

      <h1>Manage user</h1>
      <Link to={"/Add"}><h1>Add Member</h1></Link>
      <button onClick={peopleList}>query</button>
      <ul id="List">

      </ul>


      {/* <footer className="footer">
        <p className="footer-by">
          A project by{" "}
          <a className="endtext">
            Noppadon and Pachara
          </a>
        </p>
      </footer> */}
    </body>
  );
}

export default Works;
