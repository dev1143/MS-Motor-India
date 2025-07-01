import React from 'react';
import Carousel from './Carousel';
import CarCardSection from './CarCardSection';
import Footer from './Footer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ProductLandingPage = () => {
    return (
        <>
            <Carousel />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Featured Cars
                </Typography>
                <CarCardSection />
            </Container>
            <Footer />
        </>
    );
};

export default ProductLandingPage;
