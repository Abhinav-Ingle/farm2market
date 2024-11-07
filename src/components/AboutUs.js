import React from 'react';
import './AboutUs.css';
import { Box, Typography, Container } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About Farm2Market
        </Typography>
        <Typography variant="body1" paragraph>
          Farm2Market is an innovative platform aimed at empowering farmers by providing direct access to merchants and markets. 
          Our mission is to bridge the gap between the agricultural community and the marketplace, offering a seamless, transparent, 
          and user-friendly experience for both farmers and buyers.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          We aim to revolutionize the way farmers sell their crops by eliminating middlemen and allowing direct transactions between 
          farmers and buyers. We believe in fair pricing, quality assurance, and building a sustainable future for agriculture.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Key Features of Farm2Market
        </Typography>
        <Typography variant="body1" component="ul" sx={{ textAlign: 'left' }}>
          <li>Easy account creation and profile management</li>
          <li>Crop listing with real-time imaging and quality verification</li>
          <li>Direct connection to merchants and local markets</li>
          <li>Secure payment gateway ensuring quick and safe transactions</li>
          <li>Advanced quality-checking system powered by AI and data comparison</li>
        </Typography>

        <Typography variant="h5" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" paragraph>
          At Farm2Market, we are committed to making the lives of farmers easier and more profitable. With our technology-driven approach, 
          we ensure that farmers have better control over their sales, buyers can easily verify the quality of produce, and everyone benefits 
          from a streamlined, fair, and transparent agricultural market.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Join Us Today!
        </Typography>
        <Typography variant="body1" paragraph>
          Be a part of the Farm2Market community and take control of your agricultural business like never before. Let’s build a better 
          and more sustainable future together.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
