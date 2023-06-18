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

const Shifts = () => {


    const [shifts, setShifts] = useState([])

    useEffect(() => {

        const uploadShiftsData = async () => {

        
            const {data: shifts} = await axios.get('http://localhost:8888/shifts', {
                headers: { "x-access-token": sessionStorage['x-access-token'] }
            })
           // console.log("departments: " + JSON.stringify(departments));
            // const newEmployees = employees.map((emp) => {
            
            //     const departmentName = emp.department?.name || "";   
            //     return {...emp, department: departmentName}
            // });
            console.log("shifts " + JSON.stringify(shifts));
            setShifts(shifts)
            // setUserFullName(res.data)

        }

        uploadShiftsData();

    }, [])

    

    return (
        <div className="Shifts">
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Starting Hour</TableCell>
                            <TableCell align="right">Ending Hour</TableCell>

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
                        

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
     

        </div>
    )
}

export default Shifts