import './App.css';
import { Link, Outlet } from "react-router-dom";
import React from 'react';
import Login from './Login';
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';





function App() {

  const [accessApproves, setAccessApproved] = useState(false);
  const [user, setUser] = useState({})


  if (!accessApproves) {
    return <Login setAccessApproved={setAccessApproved} setUser={setUser} />
  }


  return (
    <div className="App">

      Hello {user.fullName}
      <button style={{ float: "right" }} onClick={() => {
        setAccessApproved(false);
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



export default App;
