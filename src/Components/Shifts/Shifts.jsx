import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Table } from 'react-bootstrap';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { shiftsURL, employeesURL } from "../../constans";
import { updateItem, getAll, updateItems, addItem } from "../../utils";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Shifts = () => {
  const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);
  const dispatch = useDispatch();

  const [shifts, setShifts] = useState([{}]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState({}); // To store the selected shift for editing
  const [shiftEmployees, setShiftEmployees] = useState([]); //for display changes
  const [openDialog, setOpenDialog] = useState(false); // To control the visibility of the dialog

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [newShift, setNewShift] = useState({
    date: formattedDate,
    startingHr: 0,
    endingHr: 0,
  });

  useEffect(() => {
    const uploadShiftsData = async () => {
      const { data: shifts } = await axios.get("http://localhost:8888/shifts", {
        headers: { "x-access-token": sessionStorage["x-access-token"] },
      });

      console.log("shifts " + JSON.stringify(shifts));
      setShifts(shifts);

      const { data: employees } = await getAll(employeesURL);
      setAllEmployees(employees);
    };

    if (!actionsLimitExceed) {
      uploadShiftsData();
      dispatch({ type: "ADD" });
    }
  }, []);

  const addNewShift = async () => {
    addItem(shiftsURL, newShift);
    const { data: shifts } = await getAll(shiftsURL);
    setShifts(shifts);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setNewShift({ date: formattedDate, startingHr: 0, endingHr: 0 });
  };

  const handleShiftClick = (shift) => {
    //set the shift employees
    const shiftEmps = [];
    allEmployees.map((employee) => {
      if (employee.shifts.some((empShift) => empShift._id == shift._id)) {
        shiftEmps.push(employee);
      }
    });
    setShiftEmployees(shiftEmps);

    const ShiftDate = new Date(shift.date);
    const formattedDate = ShiftDate.toISOString().split("T")[0];
    setSelectedShift({ ...shift, date: formattedDate });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleShiftUpdate = async () => {
    //add also the employees update
    debugger;
    //update employees also

    const resp = await updateItem(shiftsURL, selectedShift._id, selectedShift);

    const { data: shifts } = await getAll(shiftsURL);
    setShifts(shifts);
    // const { data: employees } = await getAll(employeesURL);
    // setEmployees(employees);
    // After updating the shift, you can fetch the updated shifts and update the state
    setOpenDialog(false); //CHECK IF NEEDE, SETSHIFTS RENDERE
  };

  const handleEmployeeAddition = () => {};

  const handleEmployeeRemoval = (empId) => {
    debugger;

    const newShiftEmp = shiftEmployees.filter((emp) => emp._id != empId);
    console.log("newSh " + newShiftEmp);
    setShiftEmployees(newShiftEmp);
  };

  return (
    <div className="Shifts">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Starting Hour</TableCell>
              <TableCell align="right">Ending Hour</TableCell>
              <TableCell align="right">Assinged Employees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleShiftClick(shift)} // Handle shift click event
              >
                <TableCell component="th" scope="row">
                  {shift.date}
                </TableCell>
                <TableCell align="right">{shift.startingHr}</TableCell>
                <TableCell align="right">{shift.endingHr}</TableCell>
                <TableCell align="right">
                  <ul>
                    {allEmployees.map((emp, index) => {
                      return emp.shifts.map((userShift) => {
                        if (userShift._id == shift._id) {
                          return (
                            <li
                              style={{ align: "right" }}
                              key={index}
                            >{`${emp.firstName} ${emp.lastName}`}</li>
                          );
                        }
                      });
                    })}
                  </ul>
                </TableCell>
              </TableRow>
            ))}

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <input
                  value={newShift.date}
                  onChange={(event) =>
                    setNewShift({ ...newShift, date: event.target.value })
                  }
                  type="date"
                ></input>
              </TableCell>
              <TableCell align="right">
                <input
                  value={newShift.startingHr}
                  onChange={(event) =>
                    setNewShift({
                      ...newShift,
                      startingHr: +event.target.value,
                    })
                  }
                  type="number"
                ></input>
              </TableCell>
              <TableCell align="right">
                <input
                  value={newShift.endingHr}
                  onChange={(event) =>
                    setNewShift({ ...newShift, endingHr: +event.target.value })
                  }
                  type="number"
                ></input>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <button
        disabled={
          actionsLimitExceed ||
          !newShift.date ||
          !newShift.startingHr ||
          !newShift.endingHr
        }
        onClick={addNewShift}
      >
        Add Shift
      </button>

      {/* Dialog for editing shift details */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Shift</DialogTitle>
        <DialogContent>
          Date:{" "}
          <input
            value={selectedShift.date}
            onChange={(event) =>
              setSelectedShift({ ...selectedShift, date: event.target.value })
            }
            type="date"
          ></input>{" "}
          <br />
          Starting HR:
          <input
            value={selectedShift.startingHr}
            onChange={(event) =>
              setSelectedShift({
                ...selectedShift,
                startingHr: +event.target.value,
              })
            }
            type="number"
          ></input>{" "}
          <br />
          Ending HR:
          <input
            value={selectedShift.endingHr}
            onChange={(event) =>
              setSelectedShift({
                ...selectedShift,
                endingHr: +event.target.value,
              })
            }
            type="number"
          ></input>{" "}
          <br /> <br />
          <div style={{ display: "flex" }}>
            <div>
              Add Employees
              <ul>
                {allEmployees.map((emp, index) => {
                  if (
                    !shiftEmployees.some((empShift) => empShift._id == emp._id)
                  ) {
                    return (
                      <li
                        onClick={handleEmployeeAddition}
                        style={{ align: "right" }}
                        key={index}
                      >{`${emp.firstName} ${emp.lastName}`}</li>
                    );
                  }
                })}
              </ul>
            </div>

            <div>
              Assingned Employees
              <ul>
                {shiftEmployees.map((emp, index) => {
                  return (
                    <li style={{ align: "right" }} key={index}>
                      {`${emp.firstName} ${emp.lastName}`}{" "}
                      <span
                        onClick={() => handleEmployeeRemoval(emp._id)}
                        style={{ color: "red" }}
                      >
                        X
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <button onClick={handleShiftUpdate}> Update</button>
          <button onClick={handleDialogClose}> Cancel</button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shifts;
