// import React, { useState, useRef, useEffect } from "react";
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import Axios from "axios";
// import axios from "axios";
// import "../css/manage.css";


// function Works() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   let people;
//   // let data;
//   const peopleList = () => {
//     console.log("active")
//     Axios.get("http://localhost:5001/peopleList"
//     ).then((Response) => {
//       people = Response.data.peopleList
//       Show()
//     })
//     // Axios.get('http://localhost:5001/getPicture'
//     // ).then((Response) => {
//     //   data = Response
//     //   console.log(data)
//     //   Show()
//     // })

//   }


//   document.body.style.overflow = "auto";

//   const Show = async () => {
//     console.log("Show()");
//     const listContainer = document.getElementById('List');
//     listContainer.innerHTML=""
//     const { data } = await axios.get('http://localhost:5001/getPicture');
//     for (const person of people) {

//       const Firstname = document.createElement('li');
//       const Lastname = document.createElement('li');
//       const Gender = document.createElement('li');
//       const Birthday = document.createElement('li');
//       const pic = document.createElement('img');
//       const hr = document.createElement('hr');
//       const btnContainer = document.createElement('div');
//       const editBtn = document.createElement('butedit');
//       const deleteBtn = document.createElement('butdelete');

//       btnContainer.classList.add('btn-container');
//       editBtn.classList.add('butedit');
//       deleteBtn.classList.add('butdelete');
//       for (const uid of data.folders) {
//         if (uid.folderName == person.UID) {

//           // console.log(uid)
//           // console.log(uid.images[0].imageBase64)

//           const imageBase64 = uid.images[0].imageBase64;
//           pic.src = `data:${uid.images[0].mimeType};base64,${imageBase64}`;
//           pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;

//         }
//       }
//       // pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;
//       var x = document.createElement("BUTTON");
//       x.id = person.UID
//       x.addEventListener("click", () => check(person.UID));
//       x.className = "edit-button";
//       var te = document.createTextNode("Edit");
//       x.appendChild(te);

//       //delete button
//       var y = document.createElement("BUTTON");
//       y.id = person.UID
//       y.addEventListener("click", () => deLete(person.UID)); // อย่าลืมเพิ่มลบคน
//       y.className = "delete-button";
//       var td = document.createTextNode("Delete");
//       y.appendChild(td);

//       // Add content to the list item
//       Firstname.textContent = `Firstname: ${person.U_Firstname}`;
//       Lastname.textContent = `Lastname: ${person.U_Lastname}`;
//       Gender.textContent = `Gender: ${person.U_Gender}`;
//       Birthday.textContent = `Birthday: ${person.U_Birthday}`;

//       // Append the list item to the list container

//       listContainer?.appendChild(Firstname);
//       listContainer?.appendChild(Lastname);
//       listContainer?.appendChild(Gender);
//       listContainer?.appendChild(Birthday);
//       listContainer?.appendChild(pic)
//       listContainer?.appendChild(x);
//       // listContainer?.appendChild(hr);
//       listContainer?.appendChild(y);
//     }
//   }

//   const check = (UID) => {
//     sessionStorage.setItem("editID",UID)
//     navigate("/editUser");
//   }
//   const deLete = async (UID) => {
//     if (confirm("Delete User " + UID + "?") == true) {
//       try {
//         const response = await axios.post('http://localhost:5001/changeStatus', { uid: UID });
//         // console.log(response.data);
//         peopleList()
//       } catch (error) {
//         console.error('Error during axios request:', error);
//       }
//     } else {
//       alert("Cancel");
//     }
//   }
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     console.log("use");
//     peopleList()
// }, []);

//   return (
//     <body>
//       <div className="containerr">

//       <input
//         type="search"
//         className="searchbar"
//         placeholder="Enter student's name to search"
//         onChange={handleSearchChange}
//         required
//       />
//         <button type="submit" className="butsearch">Search</button>
//         <Link to={"/addcrop"} className="butaddmem">Add Student</Link>
//         {/* <Link to={"/emotions"} className=" butemotion">Emotions</Link> */}
//         {/* <button onClick={peopleList} className="butq">Query</button> */}

//       </div>
//       <div className="box-student">
//         <ul id="List" className="list"></ul>
//       </div>


//     </body>
//   );
// }

// export default Works;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../css/manage.css";

function Works() {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get("http://localhost:5001/peopleList");
        setPeople(response.data.peopleList); // สมมติว่า API ส่งค่ากลับมาในรูปแบบนี้
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPeople();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPeople = searchTerm
    ? people.filter(person =>
        person.U_Firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.U_Lastname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : people;

  return (
  <div><div><input
  type="search"
  className="searchbar"
  placeholder="Enter student's name to search"
  onChange={handleSearchChange}
  required
/></div>
  <div className="containerr">
    
    <button type="submit" className="butsearch">Search</button>
    <Link to="/addcrop" className="butaddmem">Add Student</Link>

    <div className="box-student">
      <ul id="List" className="list">
        {filteredPeople.map((person, index) => (
          <li key={index} className="person-info">
            {/* Display details */}
            Firstname: {person.U_Firstname}
            Lastname: {person.U_Lastname}
            <img src={`data:image/jpeg;base64,${person.imageBase64}`} alt="profile" />
            {/* Other details */}
          </li>
        ))}
      </ul>
    </div>
  </div></div>
    
  );
}

export default Works;
