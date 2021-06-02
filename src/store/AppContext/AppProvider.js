import { useMediaQuery, useTheme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import firebase from "../../adapters/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { FIREBASE_USERS_IDENTIFIER } from "../../constants";
const _ = require("lodash");
const checkOnlineStatus = require("is-online");

const AppProvider = ({ children }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const islg = useMediaQuery(theme.breakpoints.up("lg"));
  const ismd = useMediaQuery(theme.breakpoints.only("md"));
  const issm = useMediaQuery(theme.breakpoints.only("sm"));
  const isxs = useMediaQuery(theme.breakpoints.only("xs"));
  const [isOnline, setOnlineStatus] = useState();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const notify = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  checkOnlineStatus().then((res) => {
    setOnlineStatus(res);
  });

  useEffect(() => {
    if (!_.isEmpty(user)) {
      firebase
        .database()
        .ref(FIREBASE_USERS_IDENTIFIER + "/" + user.uid)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          dispatch(setUser(data));
        });
    }
  }, []);

  const [dialogs, setDialogs] = useState({
    operators: {
      add: { open: false },
      edit: { open: false, uid: "" },
    },
  });

  const contextValue = {
    islg,
    ismd,
    issm,
    isxs,
    notify,
    isOnline,
    dialogs,
    setDialogs,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
