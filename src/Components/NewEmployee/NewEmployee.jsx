import { Box, TextField, MenuItem } from "../Common/Common.style";

const NewEmployee = ({
  setNewEmployeeSelected,
  newEmployee,
  setNewEmployee,
  addNewEmployee,
  allDepartments,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    addNewEmployee(newEmployee);
  };

  const handleDepartmentChange = (e) => {
    // console.log(e.target.value);
    const department = allDepartments.find(
      (department) => department._id == e.target.value
    );
    setNewEmployee({ ...newEmployee, department });
  };

  const handleCancel = () => {
    setNewEmployee({});
    setNewEmployeeSelected(false);
  };

  return (
    <div className="NewEmployee">
      <div>
        <h2> Add Employee:</h2>
          <Box component="form" sx={{ background: "green" }}>
            <TextField
              sx={{ marginRight: "5" }}
              id="standard-basic"
              label="First Name"
              variant="standard"
              value={newEmployee.firstName}
              onChange={(event) =>
                setNewEmployee({
                  ...newEmployee,
                  firstName: event.target.value,
                })
              }
            />

            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              value={newEmployee.lastName}
              onChange={(event) =>
                setNewEmployee({
                  ...newEmployee,
                  lastName: event.target.value,
                })
              }
            />
            <br />
            <TextField
              id="standard-basic"
              label="Start Work Year"
              variant="standard"
              type="number"
              value={newEmployee.startWorkYear}
              onChange={(event) =>
                setNewEmployee({
                  ...newEmployee,
                  startWorkYear: event.target.value,
                })
              }
            />

            <br></br>
            <TextField
              id="outlined-select-department"
              select
              onChange={handleDepartmentChange}
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {allDepartments.map((department) => (
                <MenuItem key={department._id} value={department._id}>
                  {department.name}
                </MenuItem>
              ))}
            </TextField>

            
            <br></br>
            <br></br>
            <button
              disabled={
                !newEmployee.firstName ||
                !newEmployee.lastName ||
                !newEmployee.startWorkYear ||
                !newEmployee.department
              }
              onClick={handleSubmit}
            >
              Add
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </Box>
        
      </div>
    </div>
  );
};

export default NewEmployee;
