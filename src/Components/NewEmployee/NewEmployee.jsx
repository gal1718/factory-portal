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
        <form onSubmit={handleSubmit}>
          <strong>
            First Name:{" "}
            <input
              type="text"
              value={newEmployee.firstName}
              onChange={(event) =>
                setNewEmployee({
                  ...newEmployee,
                  firstName: event.target.value,
                })
              }
            ></input>
          </strong>{" "}
          <br></br>
          <strong>
            Last Name:{" "}
            <input
              type="text"
              value={newEmployee.lastName}
              onChange={(event) =>
                setNewEmployee({ ...newEmployee, lastName: event.target.value })
              }
            ></input>
          </strong>{" "}
          <br></br>
          <strong>
            Start Work Year:{" "}
            <input
              type="number"
              value={newEmployee.startWorkYear}
              onChange={(event) =>
                setNewEmployee({
                  ...newEmployee,
                  startWorkYear: +event.target.value,
                })
              }
            ></input>
          </strong>{" "}
          <br></br>
          <strong>
            Departments:{" "}
            <select
              name="departments"
              value=""
              onChange={handleDepartmentChange}
            >
              <option value="" disabled>
                Choose a Department
              </option>
              {allDepartments.map((department, index) => {
                return (
                  <option key={index} value={department._id}>
                    {" "}
                    {department.name}
                  </option>
                );
              })}
            </select>
          </strong>
          <br></br>
          <br></br>
          <button
            disabled={
              !newEmployee.firstName ||
              !newEmployee.lastName ||
              !newEmployee.startWorkYear ||
              !newEmployee.department
            }
            type="submit"
          >
            Add
          </button>
        </form>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NewEmployee;
