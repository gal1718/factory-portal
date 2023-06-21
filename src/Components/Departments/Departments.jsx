import axios from "axios";
import { useEffect, useState } from "react";
import Department from "../Department/Department";
import { shiftsURL, employeesURL, departmentsURL } from "../../constans";
import { updateItem, getAll, updateItems, addItem } from "../../utils";
import Employee from "../Employee/Employee";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewDepartment from "../NewDepartment/NewDepartment";
import { useDispatch, useSelector } from "react-redux";

const Departments = () => {
  const dispatch = useDispatch();
  const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);

  const [departments, setDepartments] = useState([]);
  const [allShifts, setAllShifts] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  const [department, setDepartment] = useState({});
  const [departmentSelected, setDepartmentSelected] = useState(false);

  const [employee, setEmployee] = useState({});
  const [employeeSelected, setEmployeeSelected] = useState(false);

  const [newDepartment, setNewDepartment] = useState({ name: "" });
  const [newDepartmentSelected, setNewDepartmentSelected] = useState(false);

  useEffect(() => {
    const uploadDepartmentsData = async () => {
      const { data: departments } = await axios.get(
        "http://localhost:8888/departments",
        {
          headers: { "x-access-token": sessionStorage["x-access-token"] },
        }
      );

      setDepartments(departments);

      const { data: employees } = await getAll(employeesURL);
      setAllEmployees(employees);

      const { data: allShifts } = await getAll(shiftsURL);
      setAllShifts(allShifts);
    };

    if (!actionsLimitExceed) {
      uploadDepartmentsData();
      dispatch({ type: "ADD" });
    }
  }, []);

  const updateDepartment = async (newDep) => {
    const data = await updateItem(departmentsURL, newDep._id, newDep);

    const { data: newDepartments } = await getAll(departmentsURL);
    setDepartments(newDepartments);
    setDepartmentSelected(false);

    //need to update also the employees in case that emps addedto dep:
  };

  const deleteDepartment = async (depId) => {
    const data = await axios.delete(`${departmentsURL}/${depId}`);
    const { data: newDepartments } = await getAll(departmentsURL);
    setDepartments(newDepartments);
    setDepartmentSelected(false);
  };

  const handleSelection = (dep) => {
    setDepartment(dep);
    setDepartmentSelected(true);
  };

  const handleEmpSelection = (empId) => {
    const emp = allEmployees.find((employee) => employee._id == empId);
    setEmployeeSelected(true);
    setEmployee(emp);
  };

  const updateEmployee = async (newEmp) => {
    const data = await updateItem(employeesURL, newEmp._id, newEmp);
    const { data: employees } = await getAll(employeesURL);
    setAllEmployees(employees);
    setEmployeeSelected(false);
  };

  const updateEmployees = async (url, updatedEmps) => {
    const { data: employees } = await updateItems(url, updatedEmps);
    setDepartmentSelected(false);
    setAllEmployees(employees);
  };

  const deleteEmployee = async (empId) => {
    const data = await axios.delete(`${employeesURL}/${empId}`);
  };

  const addNewDepartment = async (newDep) => {
    addItem(departmentsURL, newDep);
    const { data: departments } = await getAll(departmentsURL);
    setDepartments(departments);
    setNewDepartment({ name: "" });
    setNewDepartmentSelected(false);
  };

  return (
    <div className="Departments">
      {!employeeSelected && !departmentSelected && !newDepartmentSelected && (
        <div>
          <button
            disabled={actionsLimitExceed}
            onClick={() => setNewDepartmentSelected(true)}
          >
            New Department
          </button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Manager</TableCell>
                  <TableCell align="right">Employees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((dep, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      onClick={() => handleSelection(dep)}
                      component="th"
                      scope="row"
                    >
                      {dep.name}
                    </TableCell>
                    <TableCell align="right">
                      {dep.manager?.firstName}
                    </TableCell>
                    <TableCell align="right">
                      <ul>
                        {allEmployees.map((emp, index) => {
                          if (emp.department?._id == dep._id) {
                            return (
                              <li
                                style={{ align: "right" }}
                                onClick={() => handleEmpSelection(emp._id)}
                                key={index}
                              >{`${emp.firstName} ${emp.lastName}`}</li>
                            );
                          }
                        })}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {departmentSelected && (
        <Department
          department={department}
          setDepartment={setDepartment}
          setDepartmentSelected={setDepartmentSelected}
          updateDepartment={updateDepartment}
          deleteDepartment={deleteDepartment}
          allEmployees={allEmployees}
          setAllEmployees={setAllEmployees}
          updateEmployees={updateEmployees}
        ></Department>
      )}
      {newDepartmentSelected && (
        <NewDepartment
          setNewDepartmentSelected={setNewDepartmentSelected}
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          addNewDepartment={addNewDepartment}
        ></NewDepartment>
      )}
      {employeeSelected && (
        <Employee
          setEmployeeSelected={setEmployeeSelected}
          employee={employee}
          setEmployee={setEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
          allDepartments={departments}
          allShifts={allShifts}
        ></Employee>
      )}
    </div>
  );
};

export default Departments;
