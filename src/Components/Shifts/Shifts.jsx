import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Table } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { shiftsURL, employeesURL } from "../../constans";
import { updateItem, getAll, updateItems, addItem } from '../../utils';

const Shifts = () => {


    const [shifts, setShifts] = useState([{}])
    const [allEmployees, setAllEmployees] = useState([]);
    const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);
    const dispatch = useDispatch();

    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0];
    const [newShift, setNewShift] = useState({ date: formattedDate, startingHr: 0, endingHr: 0 })
    //const [newShiftSelected, setNewShiftSelected] = useState(false);

    useEffect(() => {

        const uploadShiftsData = async () => {


            const { data: shifts } = await axios.get('http://localhost:8888/shifts', {
                headers: { "x-access-token": sessionStorage['x-access-token'] }
            })

            console.log("shifts " + JSON.stringify(shifts));
            setShifts(shifts)

            const { data: employees } = await getAll(employeesURL);
            setAllEmployees(employees)

        }


        if (!actionsLimitExceed) {

            uploadShiftsData();
            dispatch({ type: 'ADD' });

        }


    }, [])



    const addNewShift = async () => {
        addItem(shiftsURL, newShift);
        const { data: shifts } = await getAll(shiftsURL);
        setShifts(shifts);
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0];
        setNewShift({ date: formattedDate, startingHr: 0, endingHr: 0 })
    }



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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {shift.date}
                                </TableCell>
                                <TableCell align="right">{shift.startingHr}</TableCell>
                                <TableCell align="right">{shift.endingHr}</TableCell>
                                <TableCell align="right"><ul>
                                    {allEmployees.map((emp, index) => {
                                        return emp.shifts.map((userShift) => {
                                            if (userShift._id == shift._id) {
                                                return <li style={{ align: "right" }} key={index}>{`${emp.firstName} ${emp.lastName}`}</li>
                                            }
                                        })


                                    }

                                    )}


                                </ul></TableCell>


                            </TableRow>
                        ))}

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <input value={newShift.date} onChange={(event) => setNewShift({ ...newShift, date: event.target.value })} type="date"></input>
                            </TableCell>
                            <TableCell align="right"><input value={newShift.startingHr} onChange={(event) => setNewShift({ ...newShift, startingHr: +event.target.value })} type="number"></input></TableCell>
                            <TableCell align="right"><input value={newShift.endingHr} onChange={(event) => setNewShift({ ...newShift, endingHr: +event.target.value })} type="number"></input></TableCell>


                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <button disabled={!newShift.date || !newShift.startingHr || !newShift.endingHr || actionsLimitExceed} onClick={addNewShift}>Add Shift</button>


        </div>
    )
}

export default Shifts