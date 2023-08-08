import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, Typography, Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieData = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/movies/get');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error.message);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Container maxWidth="md">
        <Box mt={5} textAlign="center">
          <Typography variant="h4" component="h1">
            Movie Data
          </Typography>
          <div>
            <p>Getting bored? Click on me</p>
            <Link to="/Game">
              <Button variant="contained" color="primary">
                Click Me
              </Button>
            </Link>
          </div>
          <TextField
            label="Search Movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Grid container spacing={3} mt={3}>
            {filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie._id}>
                <Box p={2} border="1px solid #ccc" borderRadius={4}>
                  <Typography variant="h6" gutterBottom>
                    {movie.title}
                  </Typography>

                  {movie.image ? (
                    <img
                      src={`data:image/jpeg;base64,${movie.image}`}
                      alt="movie poster"
                      width="200px"
                    />
                  ) : (
                    <Typography variant="body1">
                      Image not available
                    </Typography>
                  )}
                  <Typography variant="body1">
                    Genre: {movie.genre}
                  </Typography>
                  <Typography variant="body1">
                    Year: {movie.year}
                  </Typography>
                  <Typography variant="body1">
                    Runtime: {movie.runtime} minutes
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default MovieData;
