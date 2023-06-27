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
import {
  Btn,
  ColumnContainer,
  RowContainer,
  Autocomplete,
  TextField,
  List,
  ListItemText,
  CustomListItem,
  PersonIcon
} from "../Common/Common.style";
import EditShift from "../EditShift/EditShift";
import NewShift from "../NewShift/NewShift";



const Shifts = () => {
  const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);
  const dispatch = useDispatch();

  const [shifts, setShifts] = useState([{}]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedShift, setSelectedShift] = useState({}); // To store the selected shift for editing
  const [openDialog, setOpenDialog] = useState(false); // To control the visibility of the dialog#
  const [shiftEmployees, setShiftEmployees] = useState([]); //for display changes

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

      // console.log("shifts " + JSON.stringify(shifts));

      const formattedShifts = shifts.map((shift) => {
        const formattedDate = new Date(shift.date).toISOString().split("T")[0];
        return { ...shift, date: formattedDate };
      });
      setShifts(formattedShifts);

      // if(shifts){
      //   console.log("tst: " + Shifts[0].date + " type: " + typeof(Shifts[0].date))
      // }

      const { data: employees } = await getAll(employeesURL);
      setAllEmployees(employees);
    };

    if (!actionsLimitExceed) {
      uploadShiftsData();
      dispatch({ type: "ADD" });
    }
  }, []);

  const handleShiftClick = (shift) => {
    //set the shift employees
    debugger;
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
    //setEmployeesToUpdate([]);
    setOpenDialog(false);
    setSelectedShift({});
  };

  const addNewShift = async () => {
    debugger;
    addItem(shiftsURL, newShift);
    dispatch({ type: "ADD" });
    const { data: shifts } = await getAll(shiftsURL);
    console.log("shifts reyurns: " + shifts);
    const formattedShifts = shifts.map((shift) => {
      const formattedDate = new Date(shift.date).toISOString().split("T")[0];
      return { ...shift, date: formattedDate };
    });
    setShifts(formattedShifts);
    setOpenDialog(false);
  };

  const handleShiftUpdate = async (employeesToUpdate) => {
    //add  the employees update in case that selectedshift is not null or newshift = null or emp for update
    debugger;
    if (employeesToUpdate) {
      const resp = await updateItems(employeesURL, employeesToUpdate);
      const { data: employees } = await getAll(employeesURL);
      setAllEmployees(employees);
    }

    //update employees also

    const resp = await updateItem(shiftsURL, selectedShift._id, selectedShift);
    dispatch({ type: "ADD" });

    const { data: shifts } = await getAll(shiftsURL);
    const formattedShifts = shifts.map((shift) => {
      const formattedDate = new Date(shift.date).toISOString().split("T")[0];
      return { ...shift, date: formattedDate };
    });
    setShifts(formattedShifts);
    setOpenDialog(false); //CHECK IF NEEDE, SETSHIFTS RENDERE
  };

  return (
    <div className="Shifts">
      <ColumnContainer>
        <Btn
          sx={{ alignSelf: "self-start" }}
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          New Shift
        </Btn>
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
                    <List dense>
                      {allEmployees.map((emp) => {
                        return emp.shifts.map((empShift) => {
                          if (empShift._id == shift._id) {
                            return (
                              <CustomListItem
                                key={emp._id}
                                primary={`${emp.firstName} ${emp.lastName}`}
                                secondary={`${emp.department.name}`}
                                icon= {<PersonIcon />}
                              />
                            );
                          }
                        });
                      })}
                    </List>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for editing shift details */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            {selectedShift._id && (
              <EditShift
                selectedShift={selectedShift}
                setSelectedShift={setSelectedShift}
                allEmployees={allEmployees}
                shiftEmployees={shiftEmployees}
                setShiftEmployees={setShiftEmployees}
                handleDialogClose={handleDialogClose}
                handleShiftUpdate={handleShiftUpdate}
              />
            )}
            {!selectedShift._id && (
              <NewShift
                newShift={newShift}
                setNewShift={setNewShift}
                addNewShift={addNewShift}
                handleDialogClose={handleDialogClose}
              />
            )}
          </DialogContent>
        </Dialog>
      </ColumnContainer>
    </div>
  );
};

export default Shifts;
