import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Card, CardContent, CardMedia, Rating, Grid } from '@mui/material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [formData, setFormData] = useState({
    image: null,
    userName: '',
    location: '',
    rating: 0
  });
  const [listings, setListings] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', formData.image);
    data.append('userName', formData.userName);
    data.append('location', formData.location);
    data.append('rating', formData.rating);

    const res = await fetch(`${BACKEND_URL}/api/listings`, {
      method: 'POST',
      body: data
    });

    if (res.ok) {
      alert('Listing uploaded!');
      fetchListings();
      setFormData({ image: null, userName: '', location: '', rating: 0 });
      setPreview(null);
    } else {
      alert('Upload failed : ${errorData.error}'); // handles the errors using specific error message from backend
    }
  };

  const fetchListings = async () => {
    const res = await fetch(`${BACKEND_URL}/api/listings`);
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Create Listing</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Image
          <input type="file" name="image" hidden onChange={handleChange} required />
        </Button>
        {preview && <Box mb={2}><img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 200 }} /></Box>}
        <TextField fullWidth name="userName" label="User Name" value={formData.userName} onChange={handleChange} required sx={{ mb: 2 }} />
        <TextField fullWidth name="location" label="Location" value={formData.location} onChange={handleChange} required sx={{ mb: 2 }} />
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={Number(formData.rating)}
          precision={0.5}
          onChange={(event, newValue) => setFormData({ ...formData, rating: newValue || 0 })}
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </Box>

      <Typography variant="h4" gutterBottom>All Listings</Typography>
      <Grid container spacing={2}>
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} key={listing.id}>
            <Card>
              {listing.imagePath && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`${BACKEND_URL}/${listing.imagePath}`}
                  alt={listing.userName}
                />
              )}
              <CardContent>
                <Typography variant="h6">{listing.userName}</Typography>
                <Typography color="text.secondary">{listing.location}</Typography>
                <Rating value={listing.rating} readOnly precision={0.5} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
