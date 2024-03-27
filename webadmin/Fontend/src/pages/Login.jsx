import * as React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import "../css/login.css";


export default function Sing_up() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  document.body.style.overflow = "hidden";
  
  const requst_login = () => [
    Axios.post("http://192.168.15.227:6956/login", {
      username: username,
      password: password,
    }).then((Response) => {
      console.log(Response.data)
      if (Response.data == "Success") {
        sessionStorage.setItem("username",username)
        // sessionStorage.setItem("username",username)
        console.log(sessionStorage.getItem("username"))
        // console.log(Response)
        navigate('/home');
      } else {
        sessionStorage.setItem("usernamelogin","null");
        sessionStorage.setItem("login_status","false");
        sessionStorage.setItem("role","null");
      }
    }),
  ];

  return (
    <>
    <div className="body-login">
      <div className="logintopic">LOGIN</div>
      <div className="box-dot">
        <span class="dot1"></span>
        <span class="dot2"></span>
        <span class="dot3"></span>
        <span class="dot4"></span>
      </div>
      
        <div className="loginbackgroundd">
          {/* <form className="loginbox"></form> */}
          
          <div className="wel">Welcom Back!</div>
          <div className="ltc">Login to continue</div>
          
          <div className="userpass">
          <input type="text" placeholder="USERNAME" onChange={(event) => {setusername(event.target.value);}}/>
          <input type="password" placeholder="PASSWORD" onChange={(event) => {setpassword(event.target.value);}}/>
          </div>

          <button className="butlog"onClick={requst_login} > Login</button>
          
          {/* <p >
            Not registered? <a href="Register">Create an account</a>
          </p> */}
        
        </div> 
    </div>
    </>
  );
}