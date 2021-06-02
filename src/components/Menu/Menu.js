import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import GroupIcon from "@material-ui/icons/Group";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.secondary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-secondary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({
  menu,
  closeMenu,
  setFilter,
  filter,
}) {
  //   const [anchorEl, setAnchorEl] = React.useState(null);

  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  return (
    <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}

      <StyledMenu
        id="customized-menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={closeMenu}
      >
        <StyledMenuItem
          selected={filter === "all"}
          onClick={() => {
            setFilter("all");
            closeMenu();
          }}
        >
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText secondary="All" />
        </StyledMenuItem>
        <StyledMenuItem
          selected={filter === "active"}
          onClick={() => {
            setFilter("active");
            closeMenu();
          }}
        >
          <ListItemIcon>
            <CheckCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText secondary="Active" />
        </StyledMenuItem>
        <StyledMenuItem
          selected={filter === "inactive"}
          onClick={() => {
            setFilter("inactive");
            closeMenu();
          }}
        >
          <ListItemIcon>
            <HighlightOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText secondary="Inactive" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
