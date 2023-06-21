

import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Departments from './Components/Departments/Departments';
import Employees from './Components/Employees/Employees';
import Shifts from './Components/Shifts/Shifts';
import Users from "./Components/Users/users";
import Login from './Components/Login/Login';
import HomeWrapper from "./Components/HomeWrapper/HomeWrapper";//create the store here and remove the homeWrapper



axios.interceptors.response.use(response => { //middleware for axios responses
  console.log(response)
  return response;
}, error => {
  if (error.response?.status === 401 || error.response?.status === 500) {// No Token Provided / Wrong Token - redirect to Login
    console.log(" err: " + error)
    window.location.href = 'http://localhost:3000/login'
  }
  return error;
});


const App = () => {

  const [user, setUser] = useState({})


  useEffect(() => {

    const verify = async () => {
      await axios.get('http://localhost:8888/verify', {
        headers: { "x-access-token": sessionStorage['x-access-token'] }
      })
    }
    if (window.location.href !== 'http://localhost:3000/login') {
      verify();
    }

  }, [])



  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<HomeWrapper user={user} setUser={setUser} />} >
            <Route path="employees" element={<Employees name="123" />} />
            <Route path="departments" element={<Departments />} />
            <Route path="shifts" element={<Shifts />} />
            <Route path="users" element={<Users />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App