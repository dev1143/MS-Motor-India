import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';

const images = [
    '/images/image01.jpg',
    '/images/image02.jpg',
    '/images/images03.jpg',
];

const Carousel = () => {
    const imageJSONLD = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "MS Motor Car Image Carousel",
        "associatedMedia": images.map((url, i) => ({
            "@type": "ImageObject",
            "contentUrl": `http://localhost:3000${url}`,
            "name": `Slide ${i + 1}`,
            "description": `Promotional image ${i + 1} from MS Motor Cars`,
        }))
    };



    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(imageJSONLD)}
                </script>
            </Helmet>
            <Box sx={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                {images.map((img, i) => (
                    <Box
                        key={i}
                        component="img"
                        src={img}
                        alt={`Slide ${i}`}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            transition: 'opacity 1s ease-in-out',
                            opacity: index === i ? 1 : 0,
                        }}
                    />
                ))}
            </Box>
        </>
    );
};

export default Carousel;
