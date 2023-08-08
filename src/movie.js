import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Movie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    genre: '',
    runtime: '',
    image: '',
    imagePreview:'',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setMovieData({
      ...movieData,
      image: imageFile,
      imagePreview: URL.createObjectURL(imageFile), 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Movie Data:', movieData);

    try {
      if (movieData.image instanceof File) {
      
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result.split(',')[1];
          const movieDataWithBase64 = {
            ...movieData,
            image: base64Image,
          };
         
          saveMovieData(movieDataWithBase64);
        };
        reader.readAsDataURL(movieData.image);
      } else {
       
        saveMovieData(movieData);
      }
    } catch (error) {
      console.error('Error saving movie data:', error.message);
    }
  };

  const saveMovieData = async (data) => {
    try {
      const response = await axios.post('/movies/add', data);
      console.log('Movie data saved successfully:', response.data);
  
      setMovieData({
        title: '',
        year: '',
        genre: '',
        runtime: '',
        image: '',
        imagePreview:'',
      });
    } catch (error) {
      console.error('Error saving movie data:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1">
          Insert Movie
        </Typography>
        <Link to="/moviedata">
            <Button variant="contained" color="secondary">
              Go to Movie Data
            </Button>  </Link>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            label="Title"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Year"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            fullWidth
            type="number"
            margin="normal"
          />
          <TextField
            required
            label="Genre"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            label="Runtime (minutes)"
            name="runtime"
            value={movieData.runtime}
            onChange={handleChange}
            fullWidth
            type="number"
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="image">Select Image</InputLabel>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <FormHelperText>
              {movieData.image ? movieData.image.name : 'No image selected'}
            </FormHelperText>
          </FormControl>

          {movieData.imagePreview && (
            <div>
              <Typography variant="h6">Image Preview:</Typography>
              <img
                src={movieData.imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            </div>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Movie;
