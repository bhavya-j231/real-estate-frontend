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

  // Handle input changes including file input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({ ...prev, rating: newValue || 0 }));
  };

  // Fetch listings from backend API
  const fetchListings = async () => {
    try {
      const res = await fetch('http://YOUR_BACKEND_IP:3000/listings');
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      } else {
        console.error('Failed to fetch listings');
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
    }
  };

  // Fetch listings once on mount
  useEffect(() => {
    fetchListings();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image || !formData.userName || !formData.location) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const formPayload = new FormData();
    formPayload.append('image', formData.image);
    formPayload.append('userName', formData.userName);
    formPayload.append('location', formData.location);
    formPayload.append('rating', formData.rating);

    try {
      const res = await fetch('http://YOUR_BACKEND_IP:3000/listings', {
        method: 'POST',
        body: formPayload,
      });

      if (res.ok) {
        // Reset form and preview
        setFormData({ image: null, userName: '', location: '', rating: 0 });
        setPreview(null);
        // Refresh listings
        fetchListings();
      } else {
        alert('Failed to submit listing');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error submitting listing');
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submit a Listing
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Image
          <input type="file" name="image" hidden onChange={handleChange} accept="image/*" />
        </Button>

        {preview && (
          <Box mb={2}>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
          </Box>
        )}

        <TextField
          fullWidth
          name="userName"
          label="Name"
          value={formData.userName}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Typography component="legend" sx={{ mt: 2 }}>
          Rating
        </Typography>
        <Rating
          name="rating"
          value={formData.rating}
          onChange={handleRatingChange}
          precision={0.5}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Listings
      </Typography>

      <Grid container spacing={2}>
        {listings.length === 0 && (
          <Typography variant="body1" sx={{ ml: 2 }}>
            No listings available.
          </Typography>
        )}

        {listings.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl} // Make sure your backend sends the image URL as 'imageUrl'
                alt={`${item.userName}'s listing`}
              />
              <CardContent>
                <Typography variant="h6">{item.userName}</Typography>
                <Typography color="text.secondary">{item.location}</Typography>
                <Rating value={item.rating} readOnly precision={0.5} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
