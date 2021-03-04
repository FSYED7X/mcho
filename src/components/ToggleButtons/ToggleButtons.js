import React, { useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setBankData } from '../../redux/bank/bankFormSlice';

export default function ToggleButtons({ value, setValue, amount }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& button': {
                borderColor: '#B6B6B6',
                width: '100%',
                '&:hover': {
                }
            },
            '& .Mui-selected': {
                background: value === 'credit' ? theme.palette.success.dark : 'linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)',
                color: '#fff',
                '&:hover': {
                    background: value === 'credit' ? theme.palette.success.dark : 'linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)',
                }
            }
        },
    }));

    const classes = useStyles()
    const dispatch = useDispatch()

    const handleValue = (event, newValue) => {
        if (newValue) {
            setValue(newValue);
            if (newValue === 'credit') {
                dispatch(setBankData({ key: 'credit', value: amount.current.value }))
                dispatch(setBankData({ key: 'debit', value: '' }))
            } else {
                dispatch(setBankData({ key: 'debit', value: amount.current.value }))
                dispatch(setBankData({ key: 'credit', value: '' }))

            }
        }
    };

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleValue}
            className={classes.root}
        >
            <ToggleButton value="credit">
                CREDIT
            </ToggleButton>
            <ToggleButton value="debit">
                DEBIT
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
