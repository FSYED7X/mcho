import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import { changeTheme } from "../../redux/screenSlice";
import { useDispatch, useSelector } from "react-redux";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Divider, Paper, Typography } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import { MobileView } from "react-device-detect";
import { toggleLogoutDialog } from "../../redux/authSlice";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import { Link } from "react-router-dom";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import DvrRoundedIcon from "@material-ui/icons/DvrRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: '500px',
    // padding:0x
    // backgroundColor: theme.palette.background.paper,
    // borderRadius:'20px!important'
  },
}));

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
console.log(user)
  return (
    <section className="row pt-2">
      <div className="col-md-6 col-sm-12 mb-4">
        <List
          component={Paper}
          className="py-0"
          subheader={
            <ListSubheader className="rounded">Settings</ListSubheader>
          }
        >
          <ListItem>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() => dispatch(changeTheme())}
                checked={!useSelector((state) => state.screen.theme)}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <MobileView>
            <Divider />
            <Divider />
            <ListItem
              button
              className="pt-3"
              onClick={() => dispatch(toggleLogoutDialog())}
            >
              <ListItemIcon>
                <ExitToAppRounded color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className="fw-bolder" color="error">
                    Logout
                  </Typography>
                }
              />
            </ListItem>
          </MobileView>
        </List>
      </div>

      <div className="col-md-6 col-sm-12">
        <List
          // hidden={!user.access.manageBanks}
          component={Paper}
          className="py-0 mb-4"
        >
          <ListItem button component={Link} to="/settings/manage/bks">
            <ListItemIcon>
              <AccountBalanceRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Banks" />
            <ListItemSecondaryAction>
              <KeyboardArrowRightRoundedIcon />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <List
          // hidden={!user.access.manageCustomers}
          component={Paper}
          className="py-0 mb-4"
        >
          <ListItem button component={Link} to="/settings/manage/customers">
            <ListItemIcon>
              <PeopleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Customers" />
            <ListItemSecondaryAction>
              <KeyboardArrowRightRoundedIcon />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <List
          // hidden={!user.access.manageOperators}
          component={Paper}
          className="py-0 mb-4"
        >
          <ListItem button component={Link} to="/settings/manage/operators">
            <ListItemIcon>
              <DvrRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Operators" />
            <ListItemSecondaryAction>
              <KeyboardArrowRightRoundedIcon />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </section>
  );
}
