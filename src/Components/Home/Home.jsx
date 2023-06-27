//import './App.css';
import "../../App.css";
import { Link, Outlet } from "react-router-dom";
import { React, useEffect } from "react";
import { legacy_createStore as createStore } from "redux";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Btn,
  ColumnContainer,
  RowContainer,
  Typography,
} from "../Common/Common.style";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

function Home({ user, setUser }) {
  // Home is the first page when login -> loading the actions to the store (dispatch)/ not possible to create the store and dispatch

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todayUserActions = useSelector((state) => state.todayUserActions);
  const actionsLimitExceed = useSelector((state) => state.actionsLimitExceed);

  useEffect(() => {
    const getUserActions = async () => {
      debugger;

      //brings today user's actions from the server
      let res = await axios.get(
        `http://localhost:8888/actions/getActions/${user.externalId}`,
        {
          headers: { "x-access-token": sessionStorage["x-access-token"] },
        }
      );
      let actions = res.data;
      console.log("actions : " + JSON.stringify(actions));

      if (actions.length == 0 && user)
        //if no actions for today initiate 1 - max actions = actionAllowed
        actions = [
          {
            externalId: user.externalId,
            maxActions: user.numOfActions,
            date: new Date(),
            actionAllowed: user.numOfActions,
          },
        ];
      if (actions.length > 0) {
        console.log("loading: " + actions);
        dispatch({ type: "LOAD", payload: actions }); //dispatch actions (from server or the init action)
      }
    };

    getUserActions();
  }, []);

  const handleLogOut = () => {
    debugger;
    console.log("update DB");
    console.log("user Actions employeees: " + todayUserActions);
    //update the store with the new actions when logging out
    axios.post(
      "http://localhost:8888/actions/createActions",
      todayUserActions,
      {
        headers: { "x-access-token": sessionStorage["x-access-token"] },
      }
    );

    //setUser({})//no need
    sessionStorage["x-access-token"] = "";
    navigate("/login");
  };

  if (actionsLimitExceed) {
    //fix it
    debugger;
    alert("Actions limit exceeded");
    handleLogOut();
  }

  return (
    <div className="Home">
      <ColumnContainer>
        <RowContainer
          sx={{
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <div style={{ width: "33.33%" }}></div>
          <RowContainer sx={{ width: "33.33%", justifyContent: "center" }}>
            <Link to="/">Home</Link> {" | "}
            <Link to="/employees">Employees</Link> {" | "}
            <Link to="/departments">Departments</Link> {" | "}
            <Link to="/shifts">Shifts</Link> {" | "}
            <Link to="/users">Users</Link>
          </RowContainer>
          <RowContainer sx={{ width: "33.33%", justifyContent: "end" }}>
            <Typography sx={{ marginRight: "5px" }}>
              Hello {user.name}
            </Typography>
            <Btn onClick={handleLogOut}> LogOut</Btn>
          </RowContainer>
        </RowContainer>
        <Container>
          <Outlet />
        </Container>
      </ColumnContainer>
    </div>
  );
}

export default Home;
