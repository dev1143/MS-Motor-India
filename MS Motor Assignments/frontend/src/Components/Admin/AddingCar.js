import { React, useState, useEffect } from 'react'
import "../styles.css"
import { TextField, Typography } from '@mui/material'
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material'
import { display, padding } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { carCreate, viewCarsList } from "../../actions/caractions"
import { openloader, closeloader } from '../../slice/carSlice';
import { toast } from 'react-toastify';

export default function AddingCar({ open, setOpen, carItem, view }) {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    const [value, setValue] = useState({
        title: '',
        description: '',
        price: '',
        imageFile: '',
        imageName: ''
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (carItem && carItem instanceof Object) {
            setValue({
                ...value,
                title: carItem.title,
                description: carItem.description,
                price: carItem.price,
                imageName: carItem.image,
            })
        }
    }, [carItem])

    useEffect(() => {
        if (view) {
            setValue({
                ...value,
                title: '',
                description: '',
                price: '',
                imageName: '',
            })
        }
    }, [view])

    const handleChangeFunction = (e) => {
        const { value: keyvalue, name: keyname } = e.target;
        setValue({ ...value, [keyname]: keyvalue });
    };

    const validate = () => {
        let disable = false
        if (value && (value.title.length == 0 || value.description.length == 0 || value.imageName.length == 0 || value.price.length == 0)) {
            disable = true
        }
        return disable
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(document.querySelector('#entire-form'));
        // dispatch(carCreate(Object.fromEntries(data)))
        console.log('final value___', Object.fromEntries(data));
        dispatch(openloader(true))
        carCreate(Object.fromEntries(data)).then((res) => {
            if (res) {
                dispatch(closeloader(false))
                dispatch(viewCarsList())
                toast.success(res)
                setOpen(false);
            }
        }).catch((err) => {
            toast.error(err.response.data.message)
            dispatch(closeloader(false))
            setOpen(false);
        })

    };

    const handleFile = (e) => {
        setValue({ ...value, image: e.target.files[0], imageName: e.target.files[0].name });
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log('each car item', carItem)
    return (
        <>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography>{view ? "Add Car" : "View Car"}</Typography>
                </DialogTitle>
                <DialogContent className="responsive-form">
                    <form id="entire-form" >
                        <TextField
                            label="title"
                            fullWidth
                            margin="normal"
                            value={value.title}
                            onChange={handleChangeFunction}
                            name="title"
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={value.description}
                            onChange={handleChangeFunction}
                            name="description"
                        />

                        <div className="file-upload-container">
                            <Chip
                                label={value.imageName || "No File Chosen"}
                                variant="outlined"
                                className="file-chip"
                            />
                            <input
                                type="file"
                                name="image"
                                id="actual-btn"
                                onChange={handleFile}
                                hidden
                                accept="image/*"
                            />
                            <label className="customUpload" htmlFor="actual-btn">Choose File</label>
                        </div>

                        <div className="bottom-actions">
                            <TextField
                                type="text"
                                label="Price"
                                placeholder='in Lakhs'
                                value={value.price}
                                onKeyPress={(e) => {
                                    if (e.key > 0 && e.key <= 9) {

                                    } else {
                                        e.preventDefault()
                                    }
                                }}
                                onChange={handleChangeFunction}
                                name="price"
                            />
                        </div>
                    </form>
                </DialogContent>
                {view &&
                    <DialogActions>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='outlined' disabled={validate()} onClick={submitHandler} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                }
            </Dialog>

        </>
    );
}
