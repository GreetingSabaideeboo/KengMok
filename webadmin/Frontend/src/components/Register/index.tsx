import React from "react";
import Navbar from "../Navbar";

function Register() {
  return (
    <body>
      <Navbar />
      <h1>Register</h1>
      <h2>This is Register Page</h2>
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

export default Register;
