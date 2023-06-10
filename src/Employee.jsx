import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {employeesURL, departmentsURL, shiftsURL} from './constans';
import {getItem, getAll} from './utils';
import { useNavigate } from 'react-router-dom';


//const Employee = ({ employee, setEmployee, updateEmployee, deleteEmployee, allShifts, allDepartments }) => {
    const Employee = () => {

        const [employee, setEmployee] = useState({id:0});
        const {id} = useParams() // useParams brings all parameters (from the URL) within an object
        const [allDepartments, setAllDepartments] = useState([{id:0}]);
        const [allShifts, setAllShifts] = useState([{id:0}]);
        const navigate = useNavigate();

        useEffect(() => {

            const uploadEmployeeData = async () => {
    
    
                const { data: employee } = await getItem(employeesURL,id);
                console.log("employee is: " + JSON.stringify(employee))
                setEmployee(employee[0])
    
    
             
                const { data: departments } = await getAll(departmentsURL);
                console.log("departments: " + JSON.stringify(departments))
                setAllDepartments(departments)
    
    
        
                const { data: shifts } = await getAll(shiftsURL);
                console.log("shifts: " + JSON.stringify(shifts))
                setAllShifts(shifts)
    
            }
    
            uploadEmployeeData();
    
        }, [])


    // const location = useLocation();

    // if(!employee){
    //     employee = location.state;
    //     console.log(employee)
    // }
   

    const handleDepartmentChange = (e) => {

        // console.log(e.target.value);
        const department = allDepartments.find((department) => department._id == e.target.value)
        console.log("all department: " + department)
        setEmployee({ ...employee, department })
    };

    const handleShiftsAddition = (e) => {
        const shift = allShifts.find((shift) => shift._id == e.target.value)
        const newEmpShifts = [...employee.shifts , shift]
        setEmployee({ ...employee, shifts: newEmpShifts})
    }

    const deleteShift = (shiftId) =>{
        debugger;
        const newEmpShifts =  employee.shifts.filter(shift => shift._id != shiftId)
        setEmployee({ ...employee, shifts: newEmpShifts})
    }

    const deleteEmployee = async () => {

        const data = await axios.delete(`${employeesURL}/${employee._id}`)
        navigate('/employees');
      

    }

    const updateEmployee = (event) => {
        event.preventDefault();
        axios.put(`${employeesURL}/${employee._id}`, employee);
        navigate(-1);
       
    }


    return (
        <div className="Employee">
            <div>
                <h2> Update/Delete Employee:</h2>
                <form onSubmit={updateEmployee}>
                    <strong>First Name: <input type="text" value={employee.firstName} onChange={(event) => setEmployee({ ...employee, firstName: event.target.value })}></input></strong> <br></br>
                    <strong>Last Name: <input type="text" value={employee.lastName} onChange={(event) => setEmployee({ ...employee, lastName: event.target.value })}></input></strong> <br></br>
                    <strong>Start Work Year: <input type="number" value={employee.startWorkYear} onChange={(event) => setEmployee({ ...employee, startWorkYear: event.target.value })}></input></strong> <br></br>
                    <strong>Departments: <select name="departments" value={employee.department?._id} onChange={handleDepartmentChange}>

                        <option value='' disabled>
                            Choose a Department
                        </option>
                        {allDepartments.map((department, index) => {
                            return <option key={index} value={department._id}> {department.name}</option>
                        })}

                    </select></strong><br></br><br></br>
                    <strong>Add Shifts: <select name="shifts" onChange={handleShiftsAddition} multiple>

                        <option value='' disabled>
                            Add shifts
                        </option>


                        {allShifts.map((shift, index) => {
                            const exist = employee.shifts?.find((empShift) => empShift._id == shift._id)
                            if (!exist) {
                                return <option key={index} value={shift._id}> {`${shift.date} ${shift.startingHr} ${shift.endingHr}`}</option>
                            }
                        })}


                    </select></strong>

                    <h4>Employee Shifts</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Date</th>
                                <th>Starting Hour</th>
                                <th>Ending Hour</th>



                            </tr>
                        </thead>
                        <tbody>
                            {employee.shifts?.map((shift, index) =>

                                <tr key={index}>

                                    <td>{shift.date}</td>
                                    <td>{shift.startingHr}</td>
                                    <td>{shift.endingHr}</td>
                                    <td style={{color: "red"}} onClick={() => deleteShift(shift._id)}>X</td>


                                </tr>
                            )}
                        </tbody>
                    </Table>


                    <button type="submit">Update</button>
                    <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
                </form>
            </div>


        </div>
    )
}

export default Employee