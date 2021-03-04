import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import { changeTheme } from '../../redux/screenSlice';
import { useDispatch, useSelector } from 'react-redux';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Divider, Paper, Typography } from '@material-ui/core';
import { ExitToAppRounded } from '@material-ui/icons';
import { MobileView } from 'react-device-detect';
import { toggleLogoutDialog } from '../../redux/authSlice';

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
    // const [checked, setChecked] = React.useState(['wifi']);
    const dispatch = useDispatch()
    // const theme = 
    // const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    // };

    return (
        <List component={Paper} subheader={<ListSubheader className='rounded'>Settings</ListSubheader>} className={`col-md-5 col-sm-12  ${classes.root}`}>
            <ListItem>
                <ListItemIcon>
                    <Brightness4Icon />
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary="Dark Mode" />
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        onChange={() => dispatch(changeTheme())}
                        checked={!useSelector(state => state.screen.theme)}
                        color="primary"
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <MobileView>
                <Divider /><Divider />
                <ListItem button className='pt-3' onClick={() => dispatch(toggleLogoutDialog())}>
                    <ListItemIcon>
                        <ExitToAppRounded color='error' />
                    </ListItemIcon>
                    <ListItemText primary={<Typography className='fw-bolder' color='error'>Logout</Typography>} />
                </ListItem>
            </MobileView>
        </List>
    );
}
