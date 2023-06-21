import { useEffect, useState } from "react"
import axios from "axios"
import { Table } from 'react-bootstrap';


const NewDepartment = ({setNewDepartmentSelected, newDepartment, setNewDepartment, addNewDepartment}) => {

   
    const handleSubmit = (event) => {
        event.preventDefault();
        addNewDepartment(newDepartment);
 
    }



    const handleCancel = () => {
        setNewDepartment({})
        setNewDepartmentSelected(false);
    }

    


    return (
        <div className="NewEmployee">
            <div>
                <h2> Add Department:</h2>
                <form onSubmit={handleSubmit}>
                    <strong>Name: <input type="text" value={newDepartment.name} onChange={(event) => setNewDepartment({ ...newDepartment, name: event.target.value })}></input></strong> <br/>
                   <br/><br/>
                  

                    <button disabled={!newDepartment.name} type="submit">Add</button>
                </form>
                <button onClick={handleCancel}>Cancel</button>
            </div>


        </div>
    )
}

export default NewDepartment