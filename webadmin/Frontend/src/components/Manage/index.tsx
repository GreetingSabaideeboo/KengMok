import React from "react";
import Navbar from "../Navbar";
import { Link, useParams, useNavigate } from 'react-router-dom';
import  Axios  from "axios";

function Works() {
  let people :any;
  const  peopleList = () => [
    Axios.get("http://localhost:5001/peopleList"
    ).then((Response:any) => {
      people=Response.data.peopleList
      Show()
     console.log(people)
    }),
  ];

  const Show = () => {
    const listContainer = document.getElementById('List');
    // console.log(people.map((x:any)=>x))
    const len = people.length
    console.log(len)
    for (const person of people) {
      
      // Create a new list item
      const Firstname = document.createElement('li');
      const Lastname = document.createElement('li');
      const Gender = document.createElement('li');
      const Birthday = document.createElement('li');
      const hr = document.createElement('hr');
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
      listContainer?.appendChild(hr);
    }
  }
  // peopleList()
  // Show()
  return (
    <body>
      <Navbar />
      <h1>Manage user</h1>
      <Link to={"/Add"}><h1>Add Member</h1></Link>
      <button onClick={peopleList}>query</button>
      <ul id="List">

      </ul>

  
      <footer className="footer">
        <p className="footer-by">
          A project by{" "}
          <a className="endtext">
            Noppadon and Pachara
          </a>
        </p>
      </footer>
    </body>
  );
}

export default Works;
