import axios from "axios"
import { useEffect, useState } from "react"
//import { Table } from 'react-bootstrap';
import Employee from "../Employee/Employee";
import NewEmployee from "../NewEmployee/NewEmployee";
import { employeesURL, departmentsURL, shiftsURL } from '../../constans';
import { getAll, updateItem, addItem, deleteItem, updateItems } from '../../utils';
import Department from "../Department/Department";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
            // console.log("employees: " + JSON.stringify(employees))
            setEmployees(employees)



            const { data: allDepartments } = await getAll(departmentsURL);
            //console.log("allDepartments: " + JSON.stringify(allDepartments))
            setAllDepartments(allDepartments)



            const { data: allShifts } = await getAll(shiftsURL);
            // console.log("allShifts: " + JSON.stringify(allShifts))
            setAllShifts(allShifts)

        }

        uploadAllData();

    }, [])


    const handleEmpSelection = (employee) => {

        setEmployeeSelected(true);
        setEmployee(employee)
    }


    const updateEmployee = async (newEmp) => {
        // debugger;

        const data = await updateItem(employeesURL, newEmp._id, newEmp)

        const { data: employees } = await getAll(employeesURL);
        setEmployees(employees);
        setEmployeeSelected(false)
    }



    const deleteEmployee = async (empId) => {

        const data = await deleteItem(`${employeesURL}/${empId}`)

        // const { data: employees } = await getAll(employeesURL);

        // setEmployees(employees);
        setEmployeeSelected(false);

    }

    const addNewEmployee = async (newEmp) => {
        addItem(employeesURL, newEmp);
        const { data: employees } = await getAll(employeesURL);
        setEmployees(employees);
        setNewEmployee({ firstName: "", lastName: "", startWorkYear: 0, department: {} })
        setNewEmployeeSelected(false);
    }


    const updateDepartment = async (newDep) => {
        const data = await updateItem(departmentsURL, newDep._id, newDep)
        // const data = await axios.put(`${departmentsURL}/${newDep._id}`, newDep);

        const { data: departments } = await getAll(departmentsURL);
        setAllDepartments(departments);
        const { data: employees } = await getAll(employeesURL);
        setEmployees(employees);
        setDepartmentSelected(false);
    }

    const deleteDepartment = async (depId) => {

        const data = await axios.delete(`${departmentsURL}/${depId}`)

        setDepartmentSelected(false);

    }


    const handleDepartmentSelection = (depId) => {
        debugger
        const depa = allDepartments.find((dep) => dep._id == depId)

        setDepartment(depa)
        setDepartmentSelected(true);


    }

    const updateEmployees = async (url, updatedEmps) => {

        debugger
        const { data: employees } = await updateItems(url, updatedEmps)

        console.log("data is: " + JSON.stringify(employees))
        setDepartmentSelected(false)
        setEmployees(employees)

    }



    return (
        <div className="Employees">


            {!employeeSelected && !departmentSelected && !newEmployeeSelected && <div>
                <button style={{marginRight: "30px"}} onClick={() => setNewEmployeeSelected(true)}>New Employee</button>
                <strong>Filter by Department: <select name="departments" value={departmentIdFilter} onChange={(event) => setDepartmentIdFilter(event.target.value)}>

                    <option value=''>
                        All
                    </option>
                    {allDepartments.map((department, index) => {
                        return <option key={index} value={department._id}> {department.name}</option>
                    })}

                </select></strong><br></br><br></br>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Department</TableCell>
                                <TableCell align="right">start Work Year</TableCell>
                                <TableCell align="right">Shifts</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                employees.filter((emp) => departmentIdFilter == "" || emp.department?._id == departmentIdFilter).map((employee, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell onClick={() => handleEmpSelection(employee)} component="th" scope="row">
                                            {`${employee.firstName} ${employee.lastName}`}
                                        </TableCell>
                                        <TableCell onClick={() => handleDepartmentSelection(employee.department._id)} align="right">{employee.department?.name}</TableCell>
                                        <TableCell align="right">{employee.startWorkYear}</TableCell>
                                        <TableCell align="right"><ul>
                                            {employee.shifts.map((shift, index) =>
                                                <li key={index}>{shift.date}</li>

                                            )}


                                        </ul></TableCell>


                                    </TableRow>
                                ))
                            }
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>

            }






            {employeeSelected && <Employee setEmployeeSelected={setEmployeeSelected} employee={employee} setEmployee={setEmployee} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} allDepartments={allDepartments} allShifts={allShifts}></Employee>}
            {newEmployeeSelected && <NewEmployee setNewEmployeeSelected={setNewEmployeeSelected} newEmployee={newEmployee} setNewEmployee={setNewEmployee} addNewEmployee={addNewEmployee} allDepartments={allDepartments} ></NewEmployee>}
            {departmentSelected && <Department setDepartmentSelected={setDepartmentSelected} department={department} setDepartment={setDepartment} updateDepartment={updateDepartment} deleteDepartment={deleteDepartment} allEmployees={employees} updateEmployees={updateEmployees}></Department>}
        </div>
    )
}

export default Employees