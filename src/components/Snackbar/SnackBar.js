import { Slide, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSnackbar } from '../../redux/screenSlice'

function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
}
  
function SnackBar() {
    const dispatch = useDispatch()
    const snackbar = useSelector(state => state.screen.snackbar)
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            TransitionComponent={TransitionLeft}
            open={snackbar.open} autoHideDuration={6000} onClose={()=>dispatch(closeSnackbar())}>
            <Alert variant="filled" onClose={()=>dispatch(closeSnackbar())} severity={snackbar.type}>
                {snackbar.mesg}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar
