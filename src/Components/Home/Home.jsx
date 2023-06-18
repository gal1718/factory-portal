//import './App.css';
import '../../App.css'
import { Link, Outlet } from "react-router-dom";
import React from 'react';






function Home({user, setUser}) {

 // const [accessApproved, setAccessApproved] = useState(false);


  // if (!accessApproved) {
  //   return <Login setAccessApproved={setAccessApproved} setUser={setUser} />
  // }


  return (
    <div className="Home">

      Hello {user.name}
      <button style={{ float: "right", margin: "10px" }} onClick={() => {

        setUser({})
      }}> LogOut</button>


      <br />
      <Link to="/">Home</Link> {" | "}
      <Link to="/employees">Employees</Link> {" | "}
      <Link to="/departments">Departments</Link> {" | "}
      <Link to="/shifts">Shifts</Link> {" | "}
      <Link to="/users">Users</Link>

      <br />
      <div style={{ textAlign: "left" }}>
        <Outlet />
      </div>



    </div>

  );
}



export default Home;
