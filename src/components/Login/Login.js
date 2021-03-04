import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import { BASE_URL } from "../../urlConstants";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import { setAccess, setUser } from "../../redux/authSlice";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  paper: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    padding: isMobile ? "15% 2%" : "7%",
    flexDirection: "column",
    alignItems: "center",
    "& *": {
      fontWeight: "600!important",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    error: false,
    loading: false,
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    var myHeaders = new Headers();
    var raw = JSON.stringify({ email: state.email, password: state.password });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "?action=auth", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.result) {
          console.log(result);
          localStorage.user = JSON.stringify(result.result);
          setState({ ...state, loading: false });
          dispatch(setUser(result.result));
          props.location.state
            ? history.push(props.location.state.prevPath)
            : history.push("/bank/form");
        } else {
          setState({ ...state, loading: false, error: true });
          console.log("asd");
        }
      })
      .catch((error) => {
        setState({ ...state, loading: false });
        console.log("error", error);
      });
  };

  return (
    <section
      component="main"
      className={`col-sm-12 col-md-6 col-lg-5 mx-auto ${classes.root}`}
    >
      <CssBaseline />
      <Paper elevation={isMobile ? 0 : 2} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className="display-1">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) =>
            !state.loading ? handleSubmit(e) : e.preventDefault()
          }
        >
          {state.error && (
            <div class="alert alert-danger mt-4" role="alert">
              Invalid Credentials!
            </div>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            className="mt-4"
            autoFocus
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <TextField
            variant="outlined"
            className="mt-4"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <Grid item xs className="text-center mt-4 pt-4">
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <div className="col-6 mx-auto">
            <Button
              disabled={state.loading}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className={`${classes.submit} fs-6 bg-primary text-white`}
            >
              {state.loading ? (
                <Fragment>
                  Verifying&nbsp;&nbsp;&nbsp;&nbsp;
                  <i className="bricks-white" />
                </Fragment>
              ) : (
                <Fragment>Sign In</Fragment>
              )}
            </Button>
          </div>
        </form>
      </Paper>
      <Box className="" mt={8}>
        <Copyright />
      </Box>
    </section>
  );
}
