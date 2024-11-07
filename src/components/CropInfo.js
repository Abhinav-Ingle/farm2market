import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, List, ListItem } from '@mui/material';  // Ensure all components are used

const CropInformation = () => {
  const [crops, setCrops] = useState([]);  // Store API data here
  const [loading, setLoading] = useState(true);  // Set loading while fetching data
  const [error, setError] = useState(null);  // Error state for handling any issues

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get('https://example.com/api/crops');  // Replace with your API
        setCrops(response.data);  // Store the response in state
        setLoading(false);  // Stop loading
      } catch (err) {
        setError(err.message);  // Capture and set any error
        setLoading(false);  // Stop loading
      }
    };

    fetchCropData();  // Call the function to fetch data
  }, []);

  // Conditional rendering based on the state of the component
  if (loading) {
    return <CircularProgress />;  // Show spinner while loading
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;  // Display error
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crop Information
      </Typography>

      <List>
        {crops.map((crop) => (
          <ListItem key={crop.id}>
            <Typography variant="body1">
              {crop.name} - {crop.description}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CropInformation;
