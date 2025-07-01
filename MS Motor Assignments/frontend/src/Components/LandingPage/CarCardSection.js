import React from 'react';
import Grid from '@mui/material/Grid';
import CarCard from './CarCard';
import { Helmet } from 'react-helmet';

const cars = [
  {
    title: 'Luxury Sedan',
    image: '/images/cars01.jpg',
    description: 'Stylish design with unmatched comfort.',
  },
  {
    title: 'Sporty SUV',
    image: '/images/cars02.jpg',
    description: 'Bold performance meets rugged capability.',
  },
  {
    title: 'Eco Hatchback',
    image: '/images/cars03.jpeg',
    description: 'Compact and fuel-efficient for urban roads.',
  },
];

const CarCardSection = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": cars.map((car) => ({
      "@type": "Product",
      "name": car.title,
      "description": car.description,
      "image": `http://localhost:3000${car.image}`, // Replace with production URL
      "brand": {
        "@type": "Brand",
        "name": "MS Motor Cars"
      }
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Grid container spacing={4}>
        {cars.map((car, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CarCard {...car} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CarCardSection;
