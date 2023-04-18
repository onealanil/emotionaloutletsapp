import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/loginSignup/Login";
import Signup from "./pages/loginSignup/Signup";
import Message from "./pages/message/Message";
import AdminPost from "./pages/AdminPost";
import TipsSingle from "./pages/TipsSingle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import OtherProfile from "./pages/OtherProfile";
import { io } from "socket.io-client";

const App = () => {
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  console.log(isLoggedIn);

  //socket
  const [socket, setSocket] = useState(null);

  //for socketConnection
  useEffect(() => {
    setSocket(io("https://emotionaloutletsbackend.vercel.app"));
  }, []);



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home socket={socket} /> : <Login />} exact />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Login />}
            exact
          />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route
            path="/message"
            element={isLoggedIn ? <Message socket={socket} /> : <Login />}
            exact
          />
          <Route
            path="/tips"
            element={isLoggedIn ? <AdminPost /> : <Login />}
            exact
          />
          <Route
            path="/tipsSingle/:id"
            element={isLoggedIn ? <TipsSingle /> : <Login />}
            exact
          />
          <Route
            path="/profile/:id"
            element={isLoggedIn ? <OtherProfile /> : <Login />}
            exact
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </BrowserRouter>
    </>
  );
};

export default App;
