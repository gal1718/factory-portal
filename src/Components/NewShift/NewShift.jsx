const NewShift = ({newShift, setNewShift, addNewShift, handleDialogClose}) => {
  return (
    <div className="NewShift">
      New Shift Edit Shift Date:{" "}
      <input
        value={newShift.date}
        onChange={(event) =>
          setNewShift({ ...newShift, date: event.target.value })
        }
        type="date"
      ></input>{" "}
      <br />
      Starting HR:
      <input
        value={newShift.startingHr}
        onChange={(event) =>
          setNewShift({
            ...newShift,
            startingHr: +event.target.value,
          })
        }
        type="number"
      ></input>{" "}
      <br />
      Ending HR:
      <input
        value={newShift.endingHr}
        onChange={(event) =>
          setNewShift({
            ...newShift,
            endingHr: +event.target.value,
          })
        }
        type="number"
      ></input>{" "}
      <br />
      <br />
      <button onClick={() => addNewShift()}>Add</button>
      <button onClick={handleDialogClose}> Cancel</button>
    </div>
  );
};

export default NewShift;
