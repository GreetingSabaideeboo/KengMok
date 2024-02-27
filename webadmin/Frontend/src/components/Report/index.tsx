import React from "react";
import Navbar from "../Navbar";

function index() {
  return (
    <body>
      <Navbar />
      <h1>Report</h1>
      <h2>This is Report Page</h2>
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

export default index;
