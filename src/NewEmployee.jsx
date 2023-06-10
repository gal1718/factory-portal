import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from 'react-bootstrap';
import {employeesURL, departmentsURL, shiftsURL} from './constans';
import { useNavigate } from 'react-router-dom';
import {getAll} from './utils';


const NewEmployee = () => {


    const [newEmployee, setNewEmployee] = useState({firstName: "", lastName: "", startWorkYear: 0, department: {}})
    const [allDepartments, setAllDepartments] = useState([{id:0}]);
    const navigate = useNavigate();

    useEffect(() => {

        const uploadGeneralData = async () => {


        
         
            const { data: departments } = await getAll(departmentsURL);
            console.log("departments: " + JSON.stringify(departments))
            setAllDepartments(departments)


        }

        uploadGeneralData();

    }, [])


   
  
    const handleDepartmentChange = (e) => {

        // console.log(e.target.value);
        const department = allDepartments.find((department) => department._id == e.target.value)
        setNewEmployee({ ...newEmployee, department })
    };

    const addNewEmployee = async (event) =>{
        event.preventDefault();
        const data = await axios.post(`${employeesURL}`, newEmployee)//move it to utils
        console.log(data)
        // const { data: employees } = await getAll(employeesURL); 
        // setEmployee(employees);
        navigate('/employees');
    }


    


    return (
        <div className="NewEmployee">
            <div>
                <h2> Add Employee:</h2>
                <form onSubmit={addNewEmployee}>
                    <strong>First Name: <input type="text" value={newEmployee.firstName} onChange={(event) => setNewEmployee({ ...newEmployee, firstName: event.target.value })}></input></strong> <br></br>
                    <strong>Last Name: <input type="text" value={newEmployee.lastName} onChange={(event) => setNewEmployee({ ...newEmployee, lastName: event.target.value })}></input></strong> <br></br>
                    <strong>Start Work Year: <input type="number" value={newEmployee.startWorkYear} onChange={(event) => setNewEmployee({ ...newEmployee, startWorkYear: event.target.value })}></input></strong> <br></br>
                    <strong>Departments: <select name="departments" value={newEmployee.department?._id} onChange={handleDepartmentChange}>

                        <option value='' disabled>
                            Choose a Department
                        </option>
                        {allDepartments.map((department, index) => {
                            return <option key={index} value={department._id}> {department.name}</option>
                        })}

                    </select></strong><br></br><br></br>
                  

                    <button type="submit">Add</button>
                    <button onClick={() =>{}}>Cancel</button>
                </form>
            </div>


        </div>
    )
}

export default NewEmployee