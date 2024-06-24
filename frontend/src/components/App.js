import React from "react";
import { Navbar } from "./layout/nav/Navbar";
import Body from "./layout/content/Body";
import Login from "./feature/auth/login/Login";
import Register from "./feature/auth/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <>
        <BrowserRouter>
             <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Body />} />
            </Routes>
          </BrowserRouter>
  
        </>
    );
};

export default App;
