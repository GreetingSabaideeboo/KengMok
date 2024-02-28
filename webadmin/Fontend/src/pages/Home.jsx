import React from "react";
import pic from "./team.png"
function Home() {
  const check =()=>{
    console.log(sessionStorage.getItem("username"))
  }
  return (
    <body>
      <h1>Home</h1>
      <h2>This is Home Page</h2>
      {/* <img src={pic} alt="Logo" />; */}
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

export default Home;
