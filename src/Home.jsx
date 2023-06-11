import './App.css';
import { Link, Outlet } from "react-router-dom";
import React from 'react';
import Login from './Login';
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';





function Home({user, setUser}) {

 // const [accessApproved, setAccessApproved] = useState(false);


  // if (!accessApproved) {
  //   return <Login setAccessApproved={setAccessApproved} setUser={setUser} />
  // }


  return (
    <div className="Home">

      Hello {user.fullName}
      <button style={{ float: "right" }} onClick={() => {

        setUser({})
      }}> LogOut</button>


      <br />
      <Link to="/">Home</Link> {" | "}
      <Link to="/employees">Employees</Link> {" | "}
      <Link to="/departments">Departments</Link> {" | "}
      <Link to="/shifts">Shifts</Link>

      <br />
      <div style={{ textAlign: "left" }}>
        <Outlet />
      </div>



    </div>

  );
}



export default Home;
