import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Grid
} from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    image: null,
    userName: '',
    location: '',
    rating: 0
  });

  const [preview, setPreview] = useState(null);
  const [listings, setListings] = useState([]);

  const handleChange = (e) => {
    // handle input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle form submission
  };

  const fetchListings = async () => {
    // fetch listings from backend
  };

  useEffect(() => {
    // fetch data on mount
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Form Title</Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Button variant="contained" component="label">
          Upload
          <input type="file" name="image" hidden onChange={handleChange} />
        </Button>

        <Box>{/* Image Preview */}</Box>

        <TextField fullWidth name="userName" label="Name" onChange={handleChange} />
        <TextField fullWidth name="location" label="Location" onChange={handleChange} />

        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={Number(formData.rating)}
          onChange={(event, newValue) => {}}
        />

        <Button type="submit" variant="contained">Submit</Button>
      </Box>

      <Typography variant="h4">Listings</Typography>
      <Grid container spacing={2}>
        {listings.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={'#'}
                alt="preview"
              />
              <CardContent>
                <Typography variant="h6">User Name</Typography>
                <Typography>Location</Typography>
                <Rating value={0} readOnly />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
