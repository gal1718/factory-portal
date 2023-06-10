import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from 'react-bootstrap';

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
            <Table striped bordered hover>
                <thead>
                    <tr>
                   
                        <th>Date</th>
                        <th>Starting Hour</th>
                        <th>Ending Hour</th>
                      
                        

                    </tr>
                </thead>
                <tbody>
                    {shifts.map((shift, index) =>

                        <tr key={index}>
                           
                            <td>{shift.date}</td>
                            <td>{shift.startingHr}</td>
                            <td>{shift.endingHr}</td>
                            
                            
                        </tr>
                    )}
                </tbody>
            </Table>

        </div>
    )
}

export default Shifts