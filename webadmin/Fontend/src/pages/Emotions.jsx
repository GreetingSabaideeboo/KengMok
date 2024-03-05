import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/emotion.css";
import Navbar from './Navbar';

const Emotions = () => {



    return (
        <div className="container-emotion">
            <div className="second-box">
                <div className="top-emotion">Emotions Manager</div>
                <div className="space"></div>
                <Link to={"/addsound"} className="butaddsound">Add Sound</Link>
            </div>  
        </div>
    );
}

export default Emotions;