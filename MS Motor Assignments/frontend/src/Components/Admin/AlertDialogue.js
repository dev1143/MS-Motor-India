import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openSnackbar, closeSnackbar } from '../../slice/carSlice'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteCars, viewCarsList } from '../../actions/caractions';
import { toast } from 'react-toastify';


export default function AlertDialogue() {
    const dispatch = useDispatch()
    const { message, booleanVal, carId } = useSelector((state) => state.carsStore)

    const handleClose = () => {
        dispatch(closeSnackbar())
    }
    console.log('deleted id __', carId, booleanVal)

    async function controller() {
        try {
            const res = await deleteCars(carId);
            // dispatch(closeloader(false));
            dispatch(viewCarsList());
            handleClose();
            toast.success(res.message);
            console.log('delete__', res)
        } catch (err) {
            // dispatch(closeloader(false));
            toast.error(err.message || 'Delete failed');
            handleClose();
        }

    }
    return (
        <React.Fragment>
            <Dialog
                open={booleanVal ? booleanVal : null}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {message}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        controller()
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
