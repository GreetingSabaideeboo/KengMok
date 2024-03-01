import "./App.css";
import Navbar from "./pages/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Report from "./pages/Report";
import Manage from "./pages/Manage";
import Register from "./pages/Register";
import Add from "./pages/Add";
import Addcrop from "./pages/Addcrop";
import Footer from "./pages/Footer";
import Test from "./pages/Test";

function App() {
  return (
    <div className="main-display">
      <Test/>
      <HashRouter>
        <Routes>
          {/* Specify routes without Navbar */}
          <Route path="/login/*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Specify routes with Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/search" element={<Search />} />
                  <Route path="/manage" element={<Manage />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/add" element={<Addcrop />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/addcrop" element={<Addcrop />} />
               
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
