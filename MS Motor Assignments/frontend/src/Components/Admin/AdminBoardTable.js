import * as React from 'react';
import '../styles.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import AddingCar from './AddingCar';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { viewCarsList } from '../../actions/caractions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { carID, openSnackbar } from '../../slice/carSlice';
import AlertDialogue from './AlertDialogue';

const columns = [
    { id: 'id', label: 'Sl No', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
    {
        id: 'image',
        label: 'Image',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Action',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    }

];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

export default function AdminBoardTable() {
    const dispatch = useDispatch()
    const carslist = useSelector((state) => state.carsStore.listofCars)
    const loader = useSelector((state) => state.carsStore.loader)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [listofCars, setListofCars] = React.useState(null)
    const [carObj, setCarObj] = React.useState({})
    const [view, setView] = React.useState(false)

    React.useEffect(() => {
        if (carslist && carslist.length > 0) {
            setListofCars(carslist)
        }
    }, [carslist])

    React.useEffect(() => {
        if (carslist && carslist.length == 0) {
            setListofCars([])
        }
    }, [])


    React.useEffect(() => {
        dispatch(viewCarsList())
    }, [dispatch])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setView(true)
        setOpen(true);
    };

    return (
        <>
            {console.log('all list of cars___', carslist, listofCars)}
            <Paper elevation={20} sx={{ width: '100%', margin: "0 auto", marginTop: "1%", overflow: 'hidden' }}>
                {loader && <CircularProgress />}
                <h3 align="center">ADMIN Table</h3>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px", marginTop: "10px" }}>
                    <Button style={{ padding: '3px' }} onClick={handleClickOpen} variant="contained">Add</Button>
                </div>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listofCars && listofCars.length > 0 && listofCars
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={page * rowsPerPage + index + 1}>
                                            <TableCell align="center">
                                                {page * rowsPerPage + index + 1}
                                            </TableCell>

                                            <TableCell align="center">
                                                {row.title}
                                            </TableCell>

                                            <TableCell align="center">
                                                {row.description}
                                            </TableCell>

                                            <TableCell align="center">
                                                <img
                                                    src={`http://localhost:5000${row.image}`}
                                                    alt="car"
                                                    style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
                                                />
                                            </TableCell>

                                            <TableCell align="center">
                                                {`${row.price}`} Lakh
                                            </TableCell>
                                            <TableCell>
                                                <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                                                    <Tooltip title="View">
                                                        <VisibilityIcon
                                                            onClick={() => {
                                                                let objCatch = listofCars?.find((ele) => ele.id === row.id)
                                                                setCarObj(objCatch)
                                                                setView(false)
                                                                setOpen(true)
                                                                console.log(row.id)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <DeleteIcon onClick={() => {
                                                            dispatch(openSnackbar('Are you sure you want to Delete ?'))
                                                            dispatch(carID(row.id))
                                                        }} />

                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {listofCars?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography>No data to display</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={listofCars?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <AlertDialogue />
            {open && <AddingCar view={view} open={open}
                setOpen={setOpen} carItem={carObj} />}
        </>
    );
}