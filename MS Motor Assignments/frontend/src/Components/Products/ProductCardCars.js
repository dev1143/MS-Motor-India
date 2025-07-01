import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Paper,
    Grid,
    Box,
    CircularProgress,
    Pagination
} from '@mui/material';
import { viewCarsList } from '../../actions/caractions';
import { storeDescription } from "../../slice/carSlice"
import { Helmet } from 'react-helmet';


export default function ProductCardCars() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listofCars = useSelector((state) => state.carsStore.listofCars);
    const loader = useSelector((state) => state.carsStore.loader);

    const [page, setPage] = React.useState(1);
    const carsPerPage = 8; // Show 8 cards per page

    React.useEffect(() => {
        dispatch(viewCarsList());
    }, [dispatch]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const paginatedCars = listofCars?.slice(
        (page - 1) * carsPerPage,
        page * carsPerPage
    );

    const totalPages = Math.ceil((listofCars?.length || 0) / carsPerPage);

    return (
        <>
            {paginatedCars && (
                <Helmet>
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "itemListElement": paginatedCars.map((car, index) => ({
                                "@type": "Product",
                                "name": car.title,
                                "image": `http://localhost:5000${car.image}`,
                                "description": car.description,
                                "sku": car.id,
                                "url": `http://localhost:3000/cars/${car.title.trim()}`,
                                "position": (page - 1) * carsPerPage + index + 1,
                                "brand": {
                                    "@type": "Brand",
                                    "name": "MS Motor Cars"
                                }
                            }))
                        })}
                    </script>
                </Helmet>
            )}

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {loader ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 200 }}>
                        <h3>Loading...</h3>
                    </Box>
                ) : listofCars?.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        No Data to Display
                    </Typography>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {paginatedCars.map((ele) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={ele.id}>
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            height: '100%',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: 12,
                                            }
                                        }}
                                    >
                                        <Card sx={{ height: '100%' }}>
                                            <CardMedia
                                                sx={{ height: 160 }}
                                                image={`http://localhost:5000${ele.image}`}
                                                title={ele.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div" noWrap>
                                                    {ele.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {ele.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions style={{ display: "flex", justifyContent: "center" }}>
                                                <Button fullWidth variant='outlined' onClick={() => {
                                                    navigate(`/cars/${ele.title.trim()}`)
                                                    let passedCarObject = listofCars?.find((item) => item.id == ele.id)
                                                    dispatch(storeDescription(passedCarObject))
                                                }} size="small">View</Button>
                                            </CardActions>
                                        </Card>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handleChange}
                                color="primary"
                                shape="rounded"
                                siblingCount={0}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
}
