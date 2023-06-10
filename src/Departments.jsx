import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Departments = () => {

    const [departments, setDepartments] = useState([])
    const navigate = useNavigate();

    useEffect(() => {

        const uploadDepartmentsData = async () => {

          
            const {data: departments} = await axios.get('http://localhost:8888/departments', {
                headers: { "x-access-token": sessionStorage['x-access-token'] }
            })
           // console.log("departments: " + JSON.stringify(departments));

        
            const newDepartments = departments.map((depart) => {
            
                const departmentManager = depart.manager?.firstName + " " + depart.manager?.lastName;   
                return {...depart, manager: departmentManager}
            });

           // console.log(newDepartments)
            setDepartments(newDepartments)
        }

        uploadDepartmentsData();

    }, [])



    return (
        <div className="Departments">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    
                        <th>Name</th>
                        <th>Manager</th>
                        <th>Employees</th>
                      

                    </tr>
                </thead>
                <tbody>
                    {departments.map((department, index) =>

                        <tr key={index}>
                        
                          
                            <td><Link to={`/department/${department._id}`}>{department.name}</Link></td>

                            <td>{department.manager}</td>
                            <td><ul>
                                {department.employees.map((emp, index) =>
                                    <li key={index}><Link to={`/employee/${emp._id}`}>{`${emp.firstName} ${emp.lastName}`}</Link></li>

                                )}


                            </ul></td>
                         

                        </tr>
                    )}
                </tbody>
            </Table>

        </div>
    )
}

export default Departments