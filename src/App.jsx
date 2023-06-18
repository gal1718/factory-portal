

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Departments from './Components/Departments/Departments';
import Department from './Components/Department/Department';
import Employees from './Components/Employees/Employees';
import Employee from './Components/Employee/Employee';
import NewEmployee from './Components/NewEmployee/NewEmployee';
import Shifts from './Components/Shifts/Shifts';
import Users from "./Components/Users/users";
import Login from './Components/Login/Login';

import axios from "axios";
import Home from "./Components/Home/Home";

axios.interceptors.response.use(response => {
    console.log(response)
    return response;
 }, error => {
   if (error.response?.status === 401 || error.response?.status === 500) {
    console.log(" err: " + error)
    
    //place your reentry code
    window.location.href = 'http://localhost:3000/login'
   }
   return error;
 });


const App = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
  
      const verify = async () => {
        console.log("verifing - app")
  
          // const { data } = await getItem('http://localhost:8888/', id);
          // console.log("data is: " + JSON.stringify(data))
          await axios.get('http://localhost:8888/verify', {
            headers: { "x-access-token": sessionStorage['x-access-token'] }
        })
       
      }
    if(window.location.href  !== 'http://localhost:3000/login'){
       verify();
    }
  
  }, [])


    return (
        <div className="App">
            
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login setUser={setUser} />} />
                    <Route path="/" element={<Home user={user} />} >
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