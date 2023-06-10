import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { employeesURL, departmentsURL, shiftsURL } from './constans';
import { getItem, getAll } from './utils';
import { useNavigate } from 'react-router-dom';



const Department = () => {

    const [department, setDepartment] = useState({ id: 0 });
    const { id } = useParams() // useParams brings all parameters (from the URL) within an object
    const [allEmployees, setAllEmployees] = useState([{ id: 0 }]);
    const navigate = useNavigate();

    useEffect(() => {

        const uploadDepartmentData = async () => {


            const { data: department } = await getItem(departmentsURL, id);
            console.log("department is: " + JSON.stringify(department))
            setDepartment(department[0])////????



            const { data: employees } = await getAll(employeesURL);
            console.log("employees: " + JSON.stringify(employees))
            setAllEmployees(employees)




        }

        uploadDepartmentData();

    }, [])


    // const location = useLocation();

    // if(!employee){
    //     employee = location.state;
    //     console.log(employee)
    // }

    const handleManagerChange = (e) => {

        // console.log(e.target.value);
        const manager = allEmployees.find((emp) => emp._id == e.target.value)
        console.log("all department: " + manager)
        setDepartment({ ...department, manager })

        //if new manager does not exist in departments emp - add him
        const exist = department.employees.find((emp)=> emp._id == manager._id)
        if(!exist){
            setDepartment({...department, employees: [...department.employees,manager]})
        }


        
    };


    const handleEmployeeAddition = (e) => {
        const employee = allEmployees.find((emp) => emp._id == e.target.value)
        const newDepEmployees = [...department.employees, employee]
        setDepartment({ ...department, employees: newDepEmployees })
    }

    const deleteEmployee = (empId) => {
        debugger;
        const newDepartmentEmployees = department.employees.filter(emp => emp._id != empId)
        setDepartment({ ...department, employees: newDepartmentEmployees })
    }

    const deleteDepartment = async () => {

        const data = await axios.delete(`${departmentsURL}/${department._id}`)
        navigate('/departments');


    }

    const updateDepartment = (event) => {

        //if departments emp changed -> need to update the employees tbl too
        //..
        ///
        
        event.preventDefault();
        axios.put(`${departmentsURL}/${department._id}`, department);
        navigate(-1);

    }


    return (
        <div className="Department">
            <div>
                <h2> Update/Delete Department:</h2>
                <form onSubmit={updateDepartment}>
                    <strong>Name: <input type="text" value={department.name} onChange={(event) => setDepartment({ ...department, name: event.target.value })}></input></strong> <br></br>
                    <strong>Manager: <select name="managers" value={department.manager?._id} onChange={handleManagerChange}>

                        <option value='' disabled>
                            Choose New Manager
                        </option>
                        {allEmployees.map((employee, index) => {
                            return <option key={index} value={employee._id}> {`${employee.firstName} ${employee.lastName}`}</option>
                        })}

                    </select></strong><br></br><br></br>

                    <strong>Add Employees: <select name="employees" onChange={handleEmployeeAddition} multiple>

                        <option value='' disabled>
                            Add Employees
                        </option>


                        {allEmployees.map((employee, index) => {
                            const exist = department.employees?.find((depEmp) => depEmp._id == employee._id)
                            if (!exist) {
                                return <option key={index} value={employee._id}> {`${employee.firstName} ${employee.lastName}`}</option>
                            }
                        })}


                    </select></strong>

                    <h4>Department's Employees</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Old Department</th>
                                <th>start Work Year</th>
                              



                            </tr>
                        </thead>
                        <tbody>
                            {department.employees?.map((employee, index) =>

                                <tr key={index}>

                                    <td>{employee.firstName}</td>
                                    <td>{employee.department?.name}</td>
                                    <td>{employee.startWorkYear}</td>
                                    <td style={{ color: "red" }} onClick={() => deleteEmployee(employee._id)}>X</td>


                                </tr>
                            )}
                        </tbody>
                    </Table>





                    <button type="submit">Update</button>
                    <button onClick={() => deleteDepartment(department._id)}>Delete</button>
                </form>
            </div>


        </div>
    )
}

export default Department