import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from 'react-bootstrap';
import Department from "../Department/Department";
import { shiftsURL, employeesURL, departmentsURL } from "../../constans";
import { updateItem, getAll, updateItems } from '../../utils';
import Employee from "../Employee/Employee";


const Departments = () => {

    const [departments, setDepartments] = useState([])
    const [allShifts, setAllShifts] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);

    const [department, setDepartment] = useState({})
    const [departmentSelected, setDepartmentSelected] = useState(false);

    const [employee, setEmployee] = useState({})
    const [employeeSelected, setEmployeeSelected] = useState(false);
    
   
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

            console.log("all departments " + JSON.stringify(departments))
            setDepartments(departments)

            const { data: employees } = await getAll(employeesURL);
            console.log("all employees: " + JSON.stringify(employees))
            setAllEmployees(employees)

            // setAllDepartments(allDepartments)

            const { data: allShifts } = await getAll(shiftsURL);
            // console.log("allShifts: " + JSON.stringify(allShifts))
            setAllShifts(allShifts)
        }

        uploadDepartmentsData();

    }, [])


    const updateDepartment = async (newDep) => {
        const data = await axios.put(`${departmentsURL}/${newDep._id}`, newDep);

        const { data: newDepartments } = await getAll(departmentsURL);
        setDepartments(newDepartments);

        //need to update also the employees in case that emps addedto dep:
    }



    const deleteDepartment = async (depId) => {

        const data = await axios.delete(`${departmentsURL}/${depId}`)
        const { data: newDepartments } = await getAll(departmentsURL);

        setDepartments(newDepartments);
        setDepartmentSelected(false);

    }


    const handleSelection = (dep) => {

        setDepartment(dep)
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

    const updateEmployees = async (url,updatedEmps) => {

        const data = await updateItems(url, updatedEmps)


    }

    const deleteEmployee = async (empId) => {

        const data = await axios.delete(`${employeesURL}/${empId}`)

    }



    return (
        <div className="Departments">
            {!employeeSelected && !departmentSelected &&
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
                                    {allEmployees.map((emp, index) => {
                                        if (emp.department._id == dep._id) {
                                            return <li onClick={() => handleEmpSelection(emp._id)} key={index}>{`${emp.firstName} ${emp.lastName}`}</li>
                                        }

                                    }


                                    )}


                                </ul></td>


                            </tr>
                        )}
                    </tbody>
                </Table>
            }


            {departmentSelected && <Department department={department} setDepartment={setDepartment} setDepartmentSelected={setDepartmentSelected} updateDepartment={updateDepartment} deleteDepartment={deleteDepartment} allEmployees={allEmployees} setAllEmployees={setAllEmployees} updateEmployees={updateEmployees}></Department>}
            {employeeSelected && <Employee setEmployeeSelected={setEmployeeSelected} employee={employee} setEmployee={setEmployee} updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} allDepartments={departments} allShifts={allShifts}  ></Employee>}



        </div>
    )
}

export default Departments