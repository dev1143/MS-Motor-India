import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const CarCard = ({ title, image, description, enableSEO = false }) => {
    const imageUrl = `http://localhost:3000${image}`; // Replace with live URL in production

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": title,
        "description": description,
        "image": imageUrl,
        "brand": {
            "@type": "Brand",
            "name": "MS Motor Cars"
        }
    };

    return (
        <>
            {enableSEO && (
                <Helmet>
                    <script type="application/ld+json">
                        {JSON.stringify(jsonLd)}
                    </script>
                </Helmet>
            )}
            <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardMedia component="img" height="180" image={image} alt={title} />
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default CarCard;
