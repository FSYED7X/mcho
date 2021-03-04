import React from 'react';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import GrainRoundedIcon from '@material-ui/icons/GrainRounded';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, makeStyles, Paper } from '@material-ui/core';
import Navbar from '../Navbar/Navbar';

const useStyles = makeStyles({
    nav: {
        position: 'fixed',
        bottom: '0',
        left: 0,
        width: '100%',
        height: 'fit-content',
        zIndex: '999999999', 
        '& .MuiBottomNavigationAction-label': {
            fontWeight: 'bolder!important',
        },

    }
});

export default function BottomNav({ children }) {
    const classes = useStyles();
    const location = useLocation()
    return (
        <main className="container-fluid py-4 mb-4">
            <main className='pb-4 mb-4' id="container">
                <div className={classes.appBarSpacer} />
                <Navbar/>
                {children}
            </main>

            <BottomNavigation showLabels component={Paper} elevation={2} className={classes.nav}>
                <BottomNavigationAction component={Link} to="/bank/form" selected={location.pathname.includes("/bank/")} label="Bank" icon={<AccountBalanceRoundedIcon />} />
                <BottomNavigationAction component={Link} to="/invoice" selected={location.pathname.includes("/invoice")} label="Invoice" icon={<ReceiptRoundedIcon />} />
                <BottomNavigationAction component={Link} to="/payments" label="Payments" selected={location.pathname.includes("/payments")} icon={<AccountBalanceWalletRoundedIcon />} />
                <BottomNavigationAction component={Link} to="/more" selected={location.pathname.includes("/more")} label="More" icon={<GrainRoundedIcon />} />
            </BottomNavigation>
        </main>
    );
}
