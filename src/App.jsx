

import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from 'redux';
import rootReducer from './Redux/RootReducer'
import { Provider } from 'react-redux';
import Home from './Components/Home/Home';
import Departments from './Components/Departments/Departments';
import Employees from './Components/Employees/Employees';
import Shifts from './Components/Shifts/Shifts';
import Users from "./Components/Users/users";
import Login from './Components/Login/Login';
//import HomeWrapper from "./Components/HomeWrapper/HomeWrapper";//create the store here and remove the homeWrapper



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

const store = createStore(rootReducer);

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

   // if (actionsLimitExceed == true) { // instead of checking the limit in each component buld here a function send it to all comp and call it - direct to login maybe

      // }



  return (
    <Provider store={store}>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route path="/" element={<Home user={user} setUser={setUser} />} >
              <Route path="employees" element={<Employees />} />
              <Route path="departments" element={<Departments />} />
              <Route path="shifts" element={<Shifts />} />
              <Route path="users" element={<Users />} />

            </Route>
          </Routes>
        </BrowserRouter>

      </div>
      </Provider>
  )
}

export default App