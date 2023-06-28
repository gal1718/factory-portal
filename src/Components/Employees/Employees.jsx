import axios from "axios";
import React, { useEffect, useState } from "react";
import Employee from "../Employee/Employee";
import NewEmployee from "../NewEmployee/NewEmployee";
import { employeesURL, departmentsURL, shiftsURL } from "../../constans";
import {
  getAll,
  updateItem,
  addItem,
  deleteItem,
  updateItems,
} from "../../utils";
import Department from "../Department/Department";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import {
  Btn,
  ColumnContainer,
  RowContainer,
  Autocomplete,
  TextField,
  List,
  ListItemText,
  CustomListItem,
  WorkIcon,
} from "../Common/Common.style";
import "./Employees.style";

const Employees = () => {
  const dispatch = useDispatch();
  const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);

  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [employeeSelected, setEmployeeSelected] = useState(false);

  const [allDepartments, setAllDepartments] = useState([]);
  const [allShifts, setAllShifts] = useState([]);
  const [departmentIdFilter, setDepartmentIdFilter] = useState("");
  const [newEmployeeSelected, setNewEmployeeSelected] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    department: {},
  });

  const [department, setDepartment] = useState({});
  const [departmentSelected, setDepartmentSelected] = useState(false);

  useEffect(() => {
    const uploadAllData = async () => {
      const { data: employees } = await getAll(employeesURL);

      const formattedEmployees = employees.map((employee) => {
        const newEmpShifts = employee.shifts.map((empShift) => {
          const formattedDate = new Date(empShift.date)
            .toISOString()
            .split("T")[0];
          return { ...empShift, date: formattedDate };
        });
        return { ...employee, shifts: newEmpShifts };
      });

      setEmployees(formattedEmployees);

      const { data: allDepartments } = await getAll(departmentsURL);
      setAllDepartments(allDepartments);

      const { data: allShifts } = await getAll(shiftsURL);

      const formattedShifts = allShifts.map((shift) => {
        const formattedDate = new Date(shift.date).toISOString().split("T")[0];
        return { ...shift, date: formattedDate };
      });
      setAllShifts(formattedShifts);
    };

    uploadAllData();
    dispatch({ type: "ADD" });
  }, []);

  const handleEmpSelection = (employee) => {
    setEmployeeSelected(true);
    setEmployee(employee);
  };

  const updateEmployee = async (newEmp) => {
    const data = await updateItem(employeesURL, newEmp._id, newEmp);
    dispatch({ type: "ADD" });
    const { data: employees } = await getAll(employeesURL);
    setEmployees(employees);
    setEmployeeSelected(false);
  };

  const deleteEmployee = async (empId) => {
    const data = await deleteItem(`${employeesURL}/${empId}`);
    dispatch({ type: "ADD" });
    setEmployeeSelected(false);
  };

  const addNewEmployee = async (newEmp) => {
    debugger
    addItem(employeesURL, newEmp);
    dispatch({ type: "ADD" });
    const { data: employees } = await getAll(employeesURL);
    console.log("hhh employees: " + JSON.stringify(employees))
    setEmployees(employees);
    setNewEmployee({
      firstName: "",
      lastName: "",
      startWorkYear: 0,
      department: {},
    });
    setNewEmployeeSelected(false);
  };

  const updateDepartment = async (newDep) => {
    const data = await updateItem(departmentsURL, newDep._id, newDep);
    dispatch({ type: "ADD" });
    const { data: departments } = await getAll(departmentsURL);
    setAllDepartments(departments);
    const { data: employees } = await getAll(employeesURL);
    setEmployees(employees);
    setDepartmentSelected(false);
  };

  const deleteDepartment = async (depId) => {
    const data = await axios.delete(`${departmentsURL}/${depId}`);
    dispatch({ type: "ADD" });
    setDepartmentSelected(false);
  };

  const handleDepartmentSelection = (depId) => {
    const depa = allDepartments.find((dep) => dep._id == depId);
    setDepartment(depa);
    setDepartmentSelected(true);
  };

  const updateEmployees = async (url, updatedEmps) => {
    const { data: employees } = await updateItems(url, updatedEmps);
    setDepartmentSelected(false);
    setEmployees(employees);
  };

  return (
    <div className="Employees">
      {!employeeSelected && !departmentSelected && !newEmployeeSelected && (
        <ColumnContainer>
          <RowContainer sx={{ alignSelf: "self-start", width: "100%" }}>
            <Btn
              variant="contained"
              onClick={() => setNewEmployeeSelected(true)}
            >
              New Employee
            </Btn>
            <Autocomplete
              autoComplete={false}
              options={[{ name: "All", _id: "" }, ...allDepartments]}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  sx={{
                    width: "fit-content",
                    "& input": {
                      width: "fit-content",
                    },
                  }}
                  {...params}
                  label="Filter By Department"
                />
              )}
              onChange={(event, value) =>
                setDepartmentIdFilter(value?._id || "")
              }
            ></Autocomplete>
          </RowContainer>
          <br></br>
          <br></br>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="right">Start Work Year</TableCell>
                  <TableCell align="right">Shifts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                  .filter(
                    (emp) =>
                      departmentIdFilter == "" ||
                      emp.department?._id == departmentIdFilter
                  )
                  .map((employee, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        onClick={() => handleEmpSelection(employee)}
                        component="th"
                        scope="row"
                      >
                        {`${employee.firstName} ${employee.lastName}`}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          handleDepartmentSelection(employee.department._id)
                        }
                        align="right"
                      >
                        {employee.department?.name}
                      </TableCell>
                      <TableCell align="right">
                        {employee.startWorkYear}
                      </TableCell>
                      <TableCell align="right">
                        <List dense>
                          {employee.shifts.map((shift) => (
                            <CustomListItem
                              key={shift._id}
                              primary={`Date: ${shift.date}`}
                              secondary={`Starts at: ${shift.startingHr}`}
                              icon={<WorkIcon />}
                            />
                          ))}
                        </List>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ColumnContainer>
      )}

      {employeeSelected && (
        <Employee
          setEmployeeSelected={setEmployeeSelected}
          employee={employee}
          setEmployee={setEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
          allDepartments={allDepartments}
          allShifts={allShifts}
        />
      )}
      {newEmployeeSelected && (
        <NewEmployee
          setNewEmployeeSelected={setNewEmployeeSelected}
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          addNewEmployee={addNewEmployee}
          allDepartments={allDepartments}
        />
      )}
      {departmentSelected && (
        <Department
          setDepartmentSelected={setDepartmentSelected}
          department={department}
          setDepartment={setDepartment}
          updateDepartment={updateDepartment}
          deleteDepartment={deleteDepartment}
          allEmployees={employees}
          updateEmployees={updateEmployees}
        />
      )}
    </div>
  );
};

export default Employees;
