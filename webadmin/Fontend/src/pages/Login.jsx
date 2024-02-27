import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";


export default function Sing_up() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  
  const requst_login = () => [
    Axios.post("http://localhost:5001/login", {
      username: username,
      password: password,
    }).then((Response) => {
      console.log(Response.data)
      if (Response.data == "Success") {
        sessionStorage.setItem("username",username)
        console.log(sessionStorage.getItem("username"))
        navigate('/home');
      } else {
        sessionStorage.setItem("usernamelogin","null");
        sessionStorage.setItem("login_status","false");
        sessionStorage.setItem("role","null");
      }
      
      
    }),
  ];

  return (
    <div>
      <div className="topic">LOGIN</div>
      <body className="box">
        <div className="loginbackground">
          {/* <form className="loginbox"></form> */}
          
          <div className="wel">Welcom Back!</div>
          <div className="ltc">Login to continue</div>
          
          {/* <div className="text">Username : </div> */}
          <input type="text" placeholder="USERNAME" onChange={(event) => {setusername(event.target.value);}}/>

          {/* <div className="password">Password : </div> */}
          <input type="password" placeholder="PASSWORD" onChange={(event) => {setpassword(event.target.value);}}/>

            <button className="butlog"onClick={requst_login} > login</button>
          
          {/* <p >
            Not registered? <a href="Register">Create an account</a>
          </p> */}
        
        </div> 
        </body>
    </div>
  );
}