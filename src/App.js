import React, { useEffect } from "react";
import SideNav from "./components/SideNav/SideNav";
import { BrowserView, MobileView } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import BottomNav from "./components/BottomNav/BottomNav";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Settings from "./screens/Settings/Settings";
import SnackBar from "./components/Snackbar/SnackBar";
import "./bootstrap.css";
import "./App.scss";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ContextProvider, { useIt } from "./Context";

import AddBank from "./components/AddBankDialog/AddBank";
import AddCustomer from "./components/AddCustomerDialog/AddCustomer";

import BankForm from "./screens/Bank/BankForm";
import BankSaved from "./screens/Bank/SavedData";

import InvoiceForm from "./screens/Invoice/Form";
import InvoiceSaved from "./screens/Invoice/Saved";

import PaymentForm from "./screens/Payment/Form";
import PaymentSaved from "./screens/Payment/Saved";
import Login from "./components/Login/Login";
import NoAccess from "./components/NoAccess/NoAccess";
import { BASE_URL } from "./urlConstants";
import { setUser } from "./redux/authSlice";

export const light = {
  palette: {
    type: "light",
    primary: {
      light: "#3f50b5",
      main: "#3f50b5",
      dark: "#757ce8",
      contrastText: "#fff",
    },
    gradient:
      "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)",
  },
};

export const dark = {
  palette: {
    type: "dark",
    primary: {
      light: "#9fa8da",
      main: "#aab6fe",
      dark: "#002884",
      contrastText: "#fff",
    },
    error: {
      light: "#f44336",
      main: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    gradient:
      "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)",
  },
};

function App() {
  const theme = useSelector((state) => state.screen.theme);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("container").scrollTo(0, 0);
    if (user) {
      var myHeaders = new Headers();
      var raw = JSON.stringify({ email: user.email });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(BASE_URL + "?action=auth2", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            console.log(result);
            localStorage.user = JSON.stringify(result.result);
            dispatch(setUser(result.result));
          } else {
            localStorage.clear();
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [location]);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { prevPath: rest.path } }}
            />
          )
        }
      />
    );
  };

  const Routes = () => {
    return (
      <Switch>
        <PrivateRoute path="/bank/form" component={BankForm} tag="bank" />
        <PrivateRoute path="/bank/saved" component={BankSaved} tag="bank" />

        <PrivateRoute
          path="/invoice/form"
          component={InvoiceForm}
          tag="invoice"
        />
        <PrivateRoute
          path="/invoice/saved"
          component={InvoiceSaved}
          tag="invoice"
        />

        {/* <PrivateRoute path="/payment/form" component={PaymentForm} /> */}
        {/* <PrivateRoute path="/payment/saved" component={PaymentSaved} /> */}

        <PrivateRoute path="/settings" component={Settings} tag="settings" />
        <Route path="/noaccess" component={NoAccess} />
        <PrivateRoute path="/" exact>
          <Redirect to="/bank/form" />
        </PrivateRoute>
      </Switch>
    );
  };

  return (
    <ThemeProvider theme={createMuiTheme(theme ? light : dark)}>
      <CssBaseline />

      <ContextProvider>
        <Route path="/login" component={Login} />

        <BrowserView>
          <SideNav>
            <Routes />
          </SideNav>
        </BrowserView>

        <MobileView>
          <BottomNav>
            <Routes />
          </BottomNav>
        </MobileView>

        <AddBank />
        <AddCustomer />
        <SnackBar />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
