/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
//

import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    image: null,
    userName: '',
    location: '',
    rating: ''
  });
  const [listings, setListings] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
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

    const res = await fetch('http://localhost:3000/api/listings', {
      method: 'POST',
      body: data
    });

    if (res.ok) {
      alert('Listing uploaded!');
      fetchListings(); // refresh
    } else {
      alert('Upload failed.');
    }
  };

  const fetchListings = async () => {
    const res = await fetch('http://localhost:3000/api/listings');
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" onChange={handleChange} required /><br />
        <input type="text" name="userName" placeholder="User Name" onChange={handleChange} required /><br />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required /><br />
        <input type="number" step="0.1" name="rating" placeholder="Rating" onChange={handleChange} required /><br />
        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>All Listings</h2>
      {listings.map((listing) => (
        <div key={listing.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>{listing.userName}</strong> from {listing.location}</p>
          <p>Rating: {listing.rating}</p>
          {listing.imagePath && (
            <img
              src={`http://localhost:3000/${listing.imagePath}`}
              alt="Listing"
              style={{ width: '200px', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;

