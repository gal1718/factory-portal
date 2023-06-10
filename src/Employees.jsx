import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from 'react-bootstrap';
import Employee from "./Employee";
import NewEmployee from "./NewEmployee";
import {employeesURL, departmentsURL, shiftsURL} from './constans';
import {getAll} from './utils';
import { Link } from "react-router-dom";

//const employeesURL = "http://localhost:8888/employees";//end point from express 

const Employees = () => {


    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

  
    const [allDepartments, setAllDepartments] = useState([]);
    // const [allShifts, setAllShifts] = useState([]);
    const [departmentIdFilter, setDepartmentIdFilter] = useState("")
    
    



    useEffect(() => {

        const uploadAllData = async () => {


            const { data: employees } = await getAll(employeesURL);
            console.log("employees: " + JSON.stringify(employees))
            setEmployees(employees)


         
            const { data: departments } = await getAll(departmentsURL);
            console.log("departments: " + JSON.stringify(departments))
            setAllDepartments(departments)


    
            // const { data: shifts } = await getAll(shiftsURL);
            // console.log("shifts: " + JSON.stringify(shifts))
            // setAllShifts(shifts)

        }

        uploadAllData();

    }, [])


    // const handleSelection = (employee) => {
    //     setEmployeeSelected(true)
    //     setEmployee(employee)
    // }


  



    // const deleteEmployee = async (empId) => {

    //     const data = await axios.delete(`${employeesURL}/${empId}`)
    //     const { data: employees } = await getAll(employeesURL); 

    //     setEmployees(employees);
    //     setEmployeeSelected(false);

    // }

  




    return (
        <div className="Employees">
            <button onClick={() => navigate('/newemployee')}>New Employee</button>
            <strong>Filter by Department: <select name="departments" value={departmentIdFilter} onChange={(event) => setDepartmentIdFilter(event.target.value)}>

                <option value=''>
                    Choose a Department
                </option>
                {allDepartments.map((department, index) => {
                    return <option key={index} value={department._id}> {department.name}</option>
                })}

            </select></strong><br></br><br></br>


            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Department</th>
                        <th>start Work Year</th>
                        <th>Shifts</th>

                    </tr>
                </thead>
                <tbody>
                    {employees.filter((emp) => departmentIdFilter == "" || emp.department?._id == departmentIdFilter).map((employee, index) =>

                        <tr key={index}>

                            <td><Link to={`/employee/${employee._id}`}>{`${employee.firstName} ${employee.lastName}`}</Link></td>
                            

                         
                            <li key={index}><Link to={`/department/${employee.department?._id}`}>{employee.department?.name}</Link></li>
                            <td>{employee.startWorkYear}</td>
                            <td><ul>
                                {employee.shifts.map((shift, index) =>
                                    <li key={index}>{shift.date}</li>

                                )}


                            </ul></td>

                        </tr>
                    )}
                </tbody>
            </Table>

        

        </div>
    )
}

export default Employees