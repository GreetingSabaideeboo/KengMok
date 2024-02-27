import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Search from "./components/Search";
import Report from "./components/Report";
import Manage from "./components/Manage";
import Register from "./components/Register";
import Add from "../../Fontend/src/pages/Add";
import Addcrop from "./components/Addcrop";
// import logo from "../assests/img/logo.svg"
function App() {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/report" element={<Report />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Addcrop" element={<Addcrop />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
