import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Department from "../Department/Department";
import { shiftsURL, employeesURL, departmentsURL } from "../../constans";
import { updateItem, getAll } from '../../utils';
import Employee from "../Employee/Employee";

const Departments = () => {

    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState({})
   
    const [departmentSelected, setDepartmentSelected] = useState(false);
    const [allShifts, setAllShifts] = useState([]);

    const [employee, setEmployee] = useState({})
    const [employeeSelected, setEmployeeSelected] = useState(false);
    const [allEmployees, setAllEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {


        const uploadDepartmentsData = async () => {


            const { data: departments } = await axios.get('http://localhost:8888/departments', {
                headers: { "x-access-token": sessionStorage['x-access-token'] }
            })
            // console.log("departments: " + JSON.stringify(departments));


            // const newDepartments = departments.map((depart) => {

            //     const departmentManager = depart.manager?.firstName + " " + depart.manager?.lastName;   
            //     return {...depart, manager: departmentManager}
            // });

            console.log("departments " + JSON.stringify(departments))
            setDepartments(departments)

            const { data: employees } = await getAll(employeesURL);
            console.log("employees: " + JSON.stringify(employees))
            setAllEmployees(employees)

            // setAllDepartments(allDepartments)

            const { data: allShifts } = await getAll(shiftsURL);
            console.log("allShifts: " + JSON.stringify(allShifts))
            setAllShifts(allShifts)
        }

        uploadDepartmentsData();

    }, [])


    const updateDepartment = async (newDep) => {
        const data = await axios.put(`${departmentsURL}/${newDep._id}`, newDep);

        const { data: newDepartments } = await getAll(departmentsURL);
        setDepartments(newDepartments);
    }



    const deleteDepartment = async (depId) => {

        const data = await axios.delete(`${departmentsURL}/${depId}`)
        const { data: newDepartments } = await getAll(departmentsURL);

        setDepartments(newDepartments);
        setDepartmentSelected(false);

    }


    const handleSelection = (dep) => {
        debugger
        setDepartment(dep)
       console.log("department in parent: " + JSON.stringify(department))
        setDepartmentSelected(true);
        
    

    }

    const handleEmpSelection = (empId) => {

        const emp = allEmployees.find((employee) => employee._id == empId)
        setEmployeeSelected(true)
        setEmployee(emp);


    }

    const updateEmployee = async (newEmp) => {

        const data = await updateItem(employeesURL, newEmp._id, newEmp)


    }

    const deleteEmployee = async (empId) => {

        const data = await axios.delete(`${employeesURL}/${empId}`)

    }



    return (
        <div className="Departments">
            {!employeeSelected &&
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Manager</th>
                            <th>Employees</th>


                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dep, index) =>

                            <tr key={index}>


                                <td onClick={() => handleSelection(dep)}>{dep.name}</td>

                                <td>{dep.manager.firstName}</td>
                                <td><ul>
                                    {dep.employees.map((emp, index) =>
                                        <li onClick={() => handleEmpSelection(emp._id)} key={index}>{`${emp.firstName} ${emp.lastName}`}</li>

                                    )}


                                </ul></td>


                            </tr>
                        )}
                    </tbody>
                </Table>
            }


            {departmentSelected && <Department  setDepartmentSelected={setDepartmentSelected} department={department} setDepartment={setDepartment} updateDepartment={updateDepartment} deleteDepartment={deleteDepartment} allEmployees={allEmployees} ></Department>}
            {employeeSelected && <Employee setEmployeeSelected={setEmployeeSelected} employee={employee} setEmployee={setEmployee} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} allDepartments={departments} allShifts={allShifts}  ></Employee>}



        </div>
    )
}

export default Departments