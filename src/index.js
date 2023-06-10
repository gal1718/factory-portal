import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Departments from './Departments';
import Department from './Department';
import Employees from './Employees';
import Employee from './Employee';
import NewEmployee from './NewEmployee';
import Shifts from './Shifts';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="employees" element={<Employees name="123" />} />
          <Route path="employee/:id" element={<Employee />} />
          <Route path="newemployee" element={<NewEmployee />} />
          <Route path="departments" element={<Departments />} />
          <Route path="department/:id" element={<Department />} />
          <Route path="shifts" element={<Shifts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


