import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import classes from "./Main.module.css";
//@ts-ignore
import { executeTheme } from "../Lib/Theme";
import User from "../Lib/User";

const Main = (props: {removeWrapper?: boolean}) => {
  User.getUser();

  useEffect(() => {
    executeTheme();
  }, []);

  return (
    <>
      <div className={classes.flexRow}>
        <Sidebar />
        {props.removeWrapper && <Outlet />}
        {!props.removeWrapper && (
        <div className={classes.wrapper}>
          <Outlet />
        </div>
        )}
      </div>
    </>
  );
};

export default Main;
