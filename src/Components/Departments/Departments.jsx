import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Department from "../Department/Department";
import { departmentsURL } from "../../constans";
import {getAll} from '../../utils';

const Departments = () => {

    const [departments, setDepartments] = useState([])
    const [department,setDepartment] = useState({})
    const [departmentSelected, setDepartmentSelected] = useState(false);
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

           console.log(newDepartments)
            setDepartments(newDepartments)
        }

        uploadDepartmentsData();

    }, [])

    
    const updateDepartment = async (newDep) => {
        const data = await axios.put(`${departmentsURL}/${newDep._id}`, newDep);

        const { data: departments } = await getAll(departmentsURL); 
        setDepartment(departments);
    }



    const deleteDepartment = async (depId) => {

        const data = await axios.delete(`${departmentsURL}/${depId}`)
        const { data: departments } = await getAll(departmentsURL); 

        setDepartments(departments);
        setDepartmentSelected(false);

    }


    const handleSelection = (selectedDepartment) => {
        setDepartment(selectedDepartment)
        setDepartmentSelected(true);
        
    }



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
                        
                          
                            <td onClick={() => handleSelection(department)}>{department.name}</td>

                            <td>{department.manager}</td>
                            <td><ul>
                                {department.employees.map((emp, index) =>
                                    <li key={index}>{`${emp.firstName} ${emp.lastName}`}</li>

                                )}


                            </ul></td>
                         

                        </tr>
                    )}
                </tbody>
            </Table>

          
            {departmentSelected && <Department setDepartmentSelected={setDepartmentSelected} department={department} setDepartments={setDepartments} updateDepartment={updateDepartment} deleteDepartment={deleteDepartment} ></Department>}
       
            

        </div>
    )
}

export default Departments