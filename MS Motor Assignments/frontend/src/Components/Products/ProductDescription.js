import React, { useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
} from "@mui/material";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function ProductDescription() {
    const carDescriptionObj = useSelector((state) => state.carsStore.carDescription);
    const [carsInd, setCarsInd] = React.useState({});

    const productJSONLD = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": carsInd?.title || "Car",
        "image": [`http://localhost:5000${carsInd?.image}`],
        "description": carsInd?.description || "Detailed car description",
        "sku": carsInd?.id?.toString() || "N/A",
        "brand": {
            "@type": "Brand",
            "name": "MS Motor Cars"
        },
        "offers": {
            "@type": "Offer",
            "url": `http://localhost:3000/cars/${carsInd?.title?.trim()}`,
            "priceCurrency": "INR",
            "price": carsInd?.price || "0",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "MS Motor Cars"
            }
        }
    };



    useEffect(() => {
        if (carDescriptionObj && carDescriptionObj instanceof Object) {
            setCarsInd(carDescriptionObj)
        }
    }, [carDescriptionObj])


    console.log('product describe__', carDescriptionObj)
    return (
        <>
            {carsInd && (
                <Helmet>
                    <script type="application/ld+json">
                        {JSON.stringify(productJSONLD)}
                    </script>
                </Helmet>
            )}

            <Box sx={{ padding: 3 }}>
                {/* Title Section */}
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    {carsInd.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" maxWidth={"md"}>
                    <b>Description:</b> {carsInd.description}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}>
                    <Star size={16} color="#007FFF" />
                    <Typography variant="body2">4.0 Expert Rating | 4.4 User Rating (400)</Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Image and Price Block */}
                <Grid container spacing={4}>
                    {/* Left Image */}
                    <Grid item xs={12} md={7}>
                        <Card elevation={4}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`http://localhost:5000${carsInd.image}`}
                                alt="cannot render"
                            />
                            <CardContent sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
                                <Button variant="outlined" startIcon={<img src="https://img.icons8.com/?size=100&id=zIxvkyNSaq2y&format=png&color=000000" width={20} alt="colors" />}>Colours</Button>
                                <Button variant="outlined" startIcon={<img src="https://img.icons8.com/material-rounded/24/image.png" width={20} alt="images" />}>Images</Button>
                                <Button variant="outlined" startIcon={<img src="https://img.icons8.com/material/24/360-view.png" width={20} alt="360" />}>360° View</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Price Info */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ border: "1px solid #ddd", borderRadius: 2, padding: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography fontWeight={500}>Variant</Typography>
                                    <Typography color="primary">Select Variant</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography fontWeight={500}>City</Typography>
                                    <Typography color="primary">Show price in my city</Typography>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Typography variant="h6" fontWeight={600}>{carsInd.price} Lakh</Typography>
                                <Typography variant="caption" color="text.secondary">Ex-Showroom price, Mumbai</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }} color="primary">Urban Cruiser Hyryder On Road Price</Typography>
                            </Box>

                            <Box mt={3}>
                                <Typography fontWeight={500}>Calculate your EMI</Typography>
                                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                                    <Button variant="text" color="primary">EMI Calculator</Button>
                                    <Button variant="outlined">Get EMI Offers</Button>
                                </Box>
                            </Box>

                            <Button variant="contained" color="error" fullWidth sx={{ mt: 3 }}>
                                Get July Offers
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
