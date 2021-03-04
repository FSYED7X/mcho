import React from "react";
import clsx from "clsx";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
  Drawer,
  Divider,
  Container,
  IconButton,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { openNav, closeNav } from "../../redux/screenSlice";

import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

import "./SideNav.scss";
import { Link, useLocation } from "react-router-dom";
import { useIt } from "../../Context";
import Navbar from "../Navbar/Navbar";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  ListItem: {
    paddingLeft: "21px",
  },
  toolbar: {
    paddingRight: 21, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px 0 22px",
    ...theme.mixins.toolbar,
    "& svg": {
      height: "18px",
      width: "18px",
    },
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .Mui-selected": {
      background: "none!important",
      color: theme.palette.primary.light,
      borderLeft: `3px solid`,
      borderRight: `3px solid`,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.light,
      },
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    position: "relative",
    // paddingLeft: '0!important',
    height: "100vh",
    overflowY: "scroll",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    height: "50px",
    width: "100%",
    objectFit: "contain",
  },
}));

export default function SideNav({ children }) {
  const sideNavOpen = useSelector((state) => state.screen.sideNavOpen);
  const theme = useSelector((state) => state.screen.theme);
  const { logout } = useIt();
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={`${classes.root} sidenav`}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !sideNavOpen && classes.drawerPaperClose
          ),
        }}
        open={sideNavOpen}
      >
        <div>
          {sideNavOpen ? (
            <div className={classes.toolbarIcon}>
              <h3 className="m-0">Mhco</h3>
              <IconButton onClick={() => dispatch(closeNav())}>
                <ArrowBackIosRoundedIcon />
              </IconButton>
            </div>
          ) : (
            <div className={classes.toolbarIcon}>
              <h3 className="text-left m-0">M</h3>
            </div>
          )}
        </div>
        <Divider />
        <Divider />
        <br />
        <ListItem
          component={Link}
          to="/bank/form"
          selected={location.pathname.includes("/bank")}
          button
          className={`${classes.ListItem} mb-2`}
        >
          <ListItemIcon>
            <AccountBalanceRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Bank" />
        </ListItem>

        <ListItem
          component={Link}
          to="/invoice/form"
          selected={location.pathname.includes("/invoice")}
          button
          className={`${classes.ListItem} mb-2`}
        >
          <ListItemIcon>
            <ReceiptRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="INV & PYMNT" />
        </ListItem>

        {/* <ListItem
          component={Link}
          to="/payment/form"
          selected={location.pathname.includes("/payment")}
          button
          className={`${classes.ListItem} mb-2`}
        >
          <ListItemIcon>
            <AccountBalanceWalletRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem> */}

        <Divider />
        <Divider />
        <br />
        <aside style={{ marginTop: "auto" }}>
          {!sideNavOpen && (
            <ListItem
              button
              className={`${classes.ListItem} mb-2`}
              onClick={() => dispatch(openNav())}
            >
              <ListItemIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width="20"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
                </svg>
              </ListItemIcon>
            </ListItem>
          )}

          <ListItem
            component={Link}
            to="/settings"
            selected={location.pathname.includes("/settings")}
            button
            className={`${classes.ListItem} mb-2`}
          >
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

          <ListItem
            button
            className={`${classes.ListItem} mb-2`}
            onClick={logout}
          >
            <ListItemIcon>
              <ExitToAppRoundedIcon htmlColor={theme ? "crimson" : "yellow"} />
            </ListItemIcon>
            <ListItemText
              primary={
                <span style={{ color: theme ? "crimson" : "yellow" }}>
                  Logout
                </span>
              }
            />
          </ListItem>
        </aside>
      </Drawer>
      <main className={classes.content}>
        <Container
          maxWidth="lg"
          className={`${classes.container}`}
          id="container"
        >
          <Navbar />
          {children}
        </Container>
      </main>
    </div>
  );
}
