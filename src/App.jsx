import { BrowserRouter, Routes, Route } from "react-router-dom";
import Departments from './Components/Departments/Departments';
import Department from './Components/Department/Department';
import Employees from './Components/Employees/Employees';
import Employee from './Components/Employee/Employee';
import NewEmployee from './NewEmployee';
import Shifts from './Shifts';
import Login from './Login';
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Home";

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
        console.log("verifing from react app")
  
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
                    <Route path="login" element={<Login user={user} setUser={setUser} />} />
                    <Route path="/" element={<Home user={user} setUser={setUser}/>} >
                        <Route path="employees" element={<Employees name="123" />} />
                        <Route path="departments" element={<Departments />} />
                     
                        <Route path="shifts" element={<Shifts />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App