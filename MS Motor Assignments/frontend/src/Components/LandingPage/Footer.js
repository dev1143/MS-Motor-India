import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

const Footer = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MS Motor India CarStore",
        "url": "https://www.msmotorindia.com",  // Replace with actual URL
        "logo": "images/msmotor.png", // Replace with actual logo URL
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-1234567890",       // Replace with real contact
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
            "https://www.facebook.com/msmotorindia",
            "https://www.instagram.com/msmotorindia"
        ]
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 4, mt: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                MS Motor India CarStore
                            </Typography>
                            <Typography variant="body2">
                                Your one-stop destination for premium cars. Drive your dream.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Quick Links
                            </Typography>
                            <Link href="#" color="inherit" underline="hover" display="block">About Us</Link>
                            <Link href="#" color="inherit" underline="hover" display="block">Contact</Link>
                            <Link href="#" color="inherit" underline="hover" display="block">Privacy Policy</Link>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" align="center" sx={{ mt: 4 }}>
                        © {new Date().getFullYear()} MS Motor India. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Footer;
