import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { employeesURL, departmentsURL, shiftsURL } from '../../constans';
import { getItem, getAll } from '../../utils';
import { useNavigate } from 'react-router-dom';



const Department = (setDepartmentSelected, department, setDepartment, updateDepartment, deleteDepartment, allEmployees) => {

    console.log("department" + JSON.stringify(department))



    const handleManagerChange = (e) => {

        // console.log(e.target.value);
        const manager = allEmployees.find((emp) => emp._id == e.target.value)
        setDepartment({ ...department, manager })

        //if new manager does not exist in departments emp - add him
        const exist = department.employees.find((emp)=> emp._id == manager._id)
        if(!exist){
            setDepartment({...department, employees: [...department.employees,manager]})
        }


    };


    const addEmpToDepartment = (e) => {
        const employee = allEmployees.find((emp) => emp._id == e.target.value)
        const newDepEmployees = [...department.employees, employee]
        setDepartment({ ...department, employees: newDepEmployees })
    }

    const deleteEmployeeFromDep = (empId) => {
        const newDepartmentEmployees = department.employees.filter(emp => emp._id != empId)
        setDepartment({ ...department, employees: newDepartmentEmployees })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateDepartment(department);

    }





    return (
        <div className="Department">

            <div>
                <h2> Update/Delete Department </h2>
                <span style={{ color: "red", marginLeft: "6px" }} onClick={() => setDepartmentSelected(false)}>X</span>

                <form onSubmit={handleSubmit}>
                    <strong>Name: <input type="text" value={department?.name} onChange={(event) => setDepartment({ ...department, name: event.target.value })}></input></strong> <br></br>
                    <strong>Manager: <select name="managers" value={department?.manager?._id} onChange={handleManagerChange}>

                        <option value='' disabled>
                            Choose New Manager
                        </option>
                        {allEmployees?.map((employee, index) => {
                            return <option key={index} value={employee._id}> {`${employee.firstName} ${employee.lastName}`}</option>
                        })}

                    </select></strong><br></br><br></br>

                    <strong>Add Employees: <select name="employees" onChange={addEmpToDepartment} multiple>

                        <option value='' disabled>
                            Add Employees
                        </option>


                        {allEmployees?.map((employee, index) => {
                            const exist = department?.employees?.find((depEmp) => depEmp._id == employee._id)
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
                            {department?.employees?.map((employee, index) =>

                                <tr key={index}>

                                    <td>{employee.firstName}</td>
                                    <td>{employee.department?.name}</td>
                                    <td>{employee.startWorkYear}</td>
                                    <td style={{ color: "red" }} onClick={() => deleteEmployeeFromDep(employee._id)}>X</td>


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