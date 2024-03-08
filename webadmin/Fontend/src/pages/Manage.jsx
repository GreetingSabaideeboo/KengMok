import React from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from "axios";
import axios from "axios";
import "../css/manage.css";


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

  document.body.style.overflow = "auto";

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

      const Firstname = document.createElement('li');
      const Lastname = document.createElement('li');
      const Gender = document.createElement('li');
      const Birthday = document.createElement('li');
      const pic = document.createElement('img');
      const hr = document.createElement('hr');
      const btnContainer = document.createElement('div');
      const editBtn = document.createElement('butedit');
      const deleteBtn = document.createElement('butdelete');
      
      
      pic.src='./team.png'
      btnContainer.classList.add('btn-container');
      editBtn.classList.add('butedit');
      deleteBtn.classList.add('butdelete');
      for (const uid of data.folders){
        if (uid.folderName==person.UID){
          
          console.log(uid)
          console.log(uid.images[0].imageBase64)
          
          const imageBase64 = uid.images[0].imageBase64;
          pic.src = `data:${uid.images[0].mimeType};base64,${imageBase64}`;
          pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;

        }
      }
      // pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;
      var x = document.createElement("BUTTON");
      x.id = person.UID
      x.addEventListener("click", () => check(person.UID));
      x.className = "edit-button";
      var te = document.createTextNode("Edit");
      x.appendChild(te);

      //delete button
      var y = document.createElement("BUTTON");
      y.id = person.UID
      y.addEventListener("click", () => deLete(person.UID)); // อย่าลืมเพิ่มลบคน
      y.className = "delete-button";
      var td = document.createTextNode("Delete");
      y.appendChild(td);

      // Add content to the list item
      Firstname.textContent = `Firstname: ${person.U_Firstname}`;
      Lastname.textContent = `Lastname: ${person.U_Lastname}`;
      Gender.textContent = `Gender: ${person.U_Gender}`;
      Birthday.textContent = `Birthday: ${person.U_Birthday}`;

      // Append the list item to the list container
      
      listContainer?.appendChild(Firstname);
      listContainer?.appendChild(Lastname);
      listContainer?.appendChild(Gender);
      listContainer?.appendChild(Birthday);
      listContainer?.appendChild(pic)
      listContainer?.appendChild(x);
      // listContainer?.appendChild(hr);
      listContainer?.appendChild(y);
    }
  } 

  const check = (UID) => {
    //เดี๋ยวต้องโยนไปหน้าEditที่ยังไม่สร้าง
  }
  const deLete = async (UID) => {
    if (confirm("Delete User " + UID + "?") == true) {
        try {
            const response = await axios.post('http://localhost:5001/changeStatus', { uid: UID });
            console.log(response.data);
        } catch (error) {
            console.error('Error during axios request:', error);
        }
    } else {
        alert("Cancel");
    }
}

  // peopleList()
  // Show()

  return (
    <body>
      <div className="containerr">
          
          <input type="search" className="searchbar" placeholder="Enter student's name to search" required></input>
          <button type="submit"className="butsearch">Search</button>        
          <Link to={"/addcrop"} className="butaddmem">Add Student</Link>
          {/* <Link to={"/emotions"} className=" butemotion">Emotions</Link> */}
          <button onClick={peopleList} className="butq">Query</button>
        
      </div>
      <ul id="List" className="list"></ul>
      
    </body>
  );
}

export default Works;
