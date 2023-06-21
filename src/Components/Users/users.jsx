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

const Users = () => {


    const [users, setUsers] = useState([])
    const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);
    const dispatch = useDispatch();

    useEffect(() => {

        const uploadUsersData = async () => {


            const { data: users } = await axios.get('http://localhost:8888/users', {
                headers: { "x-access-token": sessionStorage['x-access-token'] }
            })
      
            console.log("users " + JSON.stringify(users));
            setUsers(users)
           

        }

      
        if (!actionsLimitExceed) {

            uploadUsersData();
            dispatch({ type: 'ADD' });

        }

    }, [])



    return (
        <div className="Users">



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Num Of Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.fullName}
                                </TableCell>
                                <TableCell align="right">{user.numOfActions}</TableCell>
                        

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Users