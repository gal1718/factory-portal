import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from 'react-bootstrap';
import Employee from "../Employee/Employee";
import NewEmployee from "../../NewEmployee";
import { employeesURL, departmentsURL, shiftsURL } from '../../constans';
import { getAll, updateItem } from '../../utils';
import { Link } from "react-router-dom";
import Department from "../Department/Department";

//const employeesURL = "http://localhost:8888/employees";//end point from express 

const Employees = () => {


    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState({})
    const [employeeSelected, setEmployeeSelected] = useState(false);


    const [allDepartments, setAllDepartments] = useState([]);
    const [allShifts, setAllShifts] = useState([]);
    const [departmentIdFilter, setDepartmentIdFilter] = useState("")
    const [newEmployeeSelected, setNewEmployeeSelected] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", startWorkYear: 0, department: {} })


    const [department, setDepartment] = useState({})
    const [departmentSelected, setDepartmentSelected] = useState(false);

    useEffect(() => {

        const uploadAllData = async () => {


            const { data: employees } = await getAll(employeesURL);
            console.log("employees: " + JSON.stringify(employees))
            setEmployees(employees)



            const { data: allDepartments } = await getAll(departmentsURL);
            console.log("allDepartments: " + JSON.stringify(allDepartments))
            setAllDepartments(allDepartments)



            const { data: allShifts } = await getAll(shiftsURL);
            console.log("allShifts: " + JSON.stringify(allShifts))
            setAllShifts(allShifts)

        }

        uploadAllData();

    }, [])


    const handleEmpSelection = (employee) => {
        debugger
        setEmployeeSelected(true);
        setEmployee(employee)
    }


    const updateEmployee = async (newEmp) => {

        const data = await updateItem(employeesURL, newEmp._id, newEmp)

        const { data: employees } = await getAll(employeesURL);
        setEmployees(employees);
        setEmployeeSelected(false)
    }



    const deleteEmployee = async (empId) => {

        const data = await axios.delete(`${employeesURL}/${empId}`)
        const { data: employees } = await getAll(employeesURL);

        setEmployees(employees);
        setEmployeeSelected(false);

    }

    const addNewEmployee = async (newEmp) => {
        const data = await axios.post(`${employeesURL}`, newEmp)
        console.log(data)
        const { data: employees } = await getAll(employeesURL);
        setEmployees(employees);
    }

    const updateDepartment = async (newDep) => {
        const data = await axios.put(`${departmentsURL}/${newDep._id}`, newDep);

        // const { data: departments } = await getAll(departmentsURL);
        // setAllDepartments(departments);
    }

    const deleteDepartment = async (depId) => {

        const data = await axios.delete(`${departmentsURL}/${depId}`)

        setDepartmentSelected(false);

    }


    const handleDepartmentSelection = (depId) => {
        const depa = allDepartments.find((dep)=> dep._id == depId)
        debugger;
        setDepartment(depa)
        setDepartmentSelected(true);
        

    }



    return (
        <div className="Employees">
            {!employeeSelected && !departmentSelected && <div>
                <button onClick={() => setNewEmployeeSelected(true)}>New Employee</button>
                <strong>Filter by Department: <select name="departments" value={departmentIdFilter} onChange={(event) => setDepartmentIdFilter(event.target.value)}>

                    <option value=''>
                        All
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
                        {employees.filter((emp) => departmentIdFilter == "" || emp.department._id == departmentIdFilter).map((employee, index) =>

                            <tr key={index}>

                                <td onClick={() => handleEmpSelection(employee)}>{`${employee.firstName} ${employee.lastName}`}</td>

                                <td onClick={() => handleDepartmentSelection(employee.department._id)}>{employee.department.name}</td>
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
            }

            {employeeSelected && <Employee setEmployeeSelected={setEmployeeSelected} employee={employee} setEmployee={setEmployee} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} allDepartments={allDepartments} allShifts={allShifts}></Employee>}
            {newEmployeeSelected && <NewEmployee newEmployee={newEmployee} setNewEmployee={setNewEmployee} addNewEmployee={addNewEmployee} allDepartments={allDepartments} ></NewEmployee>}
            {departmentSelected &&  <Department setDepartmentSelected={setDepartmentSelected} department={department} setDepartment={setDepartment}  updateDepartment={updateDepartment} deleteDepartment={deleteDepartment}></Department>}
        </div>
    )
}

export default Employees