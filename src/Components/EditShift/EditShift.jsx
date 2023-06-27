import { useEffect, useState } from "react";

const EditShift = ({
  selectedShift,
  setSelectedShift,
  allEmployees,
  shiftEmployees,
  setShiftEmployees,
  handleDialogClose,
  handleShiftUpdate,
}) => {
  const [employeesToUpdate, setEmployeesToUpdate] = useState([]);
  console.log("selected Shift: " + JSON.stringify(selectedShift) + " End");

  const handleEmployeeAddition = (emp) => {
    debugger;
    const newUpdatedEmployees = [
      ...employeesToUpdate,
      { ...emp, shifts: [...emp.shifts, selectedShift] },
    ];
    setEmployeesToUpdate(newUpdatedEmployees);
    setShiftEmployees([...shiftEmployees, emp]);
  };

  const handleEmployeeRemoval = (emp) => {
    debugger;

    const newEmployeeShifts = emp.shifts.filter(
      (empShift) => empShift._id != selectedShift._id
    );
    const newUpdatedEmployees = [
      ...employeesToUpdate,
      { ...emp, shifts: newEmployeeShifts },
    ];
    setEmployeesToUpdate(newUpdatedEmployees);

    const newShiftEmp = shiftEmployees.filter(
      (employee) => employee._id != emp._id
    );
    console.log("newSh " + newShiftEmp);
    setShiftEmployees(newShiftEmp);
  };

  return (
    <div className="EditShift">
      Edit Shift Edit Shift Date:{" "}
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
      {selectedShift._id && (
        <div style={{ display: "flex" }}>
          <div>
            Add Employees
            <ul>
              {allEmployees.map((emp, index) => {
                if (
                  !shiftEmployees.some((empShift) => empShift._id == emp._id)
                ) {
                  return (
                    <li style={{ align: "right" }} key={index}>
                      {`${emp.firstName} ${emp.lastName} `}
                      <span
                        onClick={() => handleEmployeeAddition(emp)}
                        style={{ color: "blue" }}
                      >
                        +
                      </span>
                    </li>
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
                      onClick={() => handleEmployeeRemoval(emp)}
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
      )}
      <br />
      <br />
      <button onClick={() => handleShiftUpdate(employeesToUpdate)}>
        {" "}
        Update
      </button>
      <button onClick={handleDialogClose}> Cancel</button>
    </div>
  );
};

export default EditShift;
