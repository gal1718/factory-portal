import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { employeesURL, departmentsURL, shiftsURL } from "../../constans";
import { getAll } from "../../utils";

const Department = ({
  setDepartmentSelected,
  department,
  setDepartment,
  updateDepartment,
  deleteDepartment,
  allEmployees,
  setAllEmployees,
  updateEmployees,
}) => {
  const [departmentEmployees, setDepartmentEmployees] = useState([]);
  const [employeesForUpdate, setEmployeesForUpdate] = useState([]);

  useEffect(() => {
    const departmentEmps = [];
    allEmployees.map((employee) => {
      if (employee.department?._id == department._id) {
        departmentEmps.push(employee);
      }
    });

    setDepartmentEmployees(departmentEmps);
  }, []);

  const handleManagerChange = (e) => {
    const manager = allEmployees.find((emp) => emp._id == e.target.value);
    setDepartment({ ...department, manager });

    //if new manager does not exist in departments emp - add him
    // const exist = department.employees.find((emp) => emp._id == manager._id)
    // if (!exist) {
    //     setDepartment({ ...department, employees: [...department.employees, manager] })
    // }
  };

  const handleEmployeeAddition = (updatedEmp) => {
    //adding emp only to state
    setEmployeesForUpdate([...employeesForUpdate, updatedEmp]);
    setDepartmentEmployees([...departmentEmployees, updatedEmp]);
  };

  const handleEmployeeRemoval = (updatedEmp) => {
    // debugger;
    //adding emp only to state
    setEmployeesForUpdate([...employeesForUpdate, updatedEmp]);
    const newDepEmps = departmentEmployees.filter(
      (emp) => emp._id != updatedEmp._id
    );
    setDepartmentEmployees(newDepEmps);
  };

  const handleSubmit = (event) => {
    debugger;
    event.preventDefault();
    //update emp dep:
    updateDepartment(department);

    if (employeesForUpdate.length > 0)
      updateEmployees(employeesURL, employeesForUpdate); //only employees has depasrtment. departemt doesnt have emps field

    //need to update also the dep for the new emp
  };

  return (
    <div className="Department">
      <div>
        <h2> Update/Delete Department </h2>
        <span
          style={{ color: "red", marginLeft: "6px" }}
          onClick={() => setDepartmentSelected(false)}
        >
          X
        </span>

        <form onSubmit={handleSubmit}>
          <strong>
            Name:{" "}
            <input
              type="text"
              value={department?.name}
              onChange={(event) =>
                setDepartment({ ...department, name: event.target.value })
              }
            ></input>
          </strong>{" "}
          <br></br>
          <strong>
            Manager:{" "}
            <select
              name="managers"
              value={department?.manager?._id}
              onChange={handleManagerChange}
            >
              <option value="" disabled>
                Choose New Manager
              </option>
              {allEmployees?.map((employee, index) => {
                if (employee.department?._id == department._id) {
                  return (
                    <option key={index} value={employee._id}>
                      {" "}
                      {`${employee.firstName} ${employee.lastName}`}
                    </option>
                  );
                }
              })}
            </select>
          </strong>
          <br></br>
          <br></br>
          <strong>
            Add Employees:{" "}
            <select name="employees" multiple>
              <option value="" disabled>
                Add Employees
              </option>

              {allEmployees.map((employee, index) => {
                if (
                  !departmentEmployees.some((emp) => emp._id == employee._id)
                ) {
                  return (
                    <option
                      onClick={() =>
                        handleEmployeeAddition({ ...employee, department })
                      }
                      key={index}
                      value={employee._id}
                    >
                      {" "}
                      {`${employee.firstName} ${employee.lastName}`}
                    </option>
                  );
                }
              })}
            </select>
          </strong>
          <h4>Department's Employees</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>start Work Year</th>
              </tr>
            </thead>
            <tbody>
              {departmentEmployees.length > 0 &&
                departmentEmployees.map((employee, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {employee.firstName} {employee.lastName}
                      </td>
                      <td>{employee.startWorkYear}</td>
                      <td
                        style={{ color: "red" }}
                        onClick={() =>
                          handleEmployeeRemoval({ ...employee, department: "" })
                        }
                      >
                        X
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <button type="submit">Update</button>
          <button onClick={() => deleteDepartment(department._id)}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default Department;
