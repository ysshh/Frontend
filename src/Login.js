import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';




export default function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      if (!validatePassword(password)) {
        alert('Please enter a password with at least 8 characters');
        return;
      }

      try {
        const { data } = await axios.post('/users/login', {
          email: email,
          password: password,
        });

        if (!data.user) {
          alert('Invalid email or password');
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', email);

          alert('Login Successful');
          // setIsLoggedIn(true); 
          navigate('/todo');
          
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all the fields');
    }
  };

  const showPopup = () => {
    alert('plz dont forgot your pssword ');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
      
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      
       
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background
        backdropFilter: 'blur(10px)', // Apply blur effect
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Add a shadow
        borderRadius: '10px', // Rounded corners
        padding: '20px', // Padding inside the box
      }}
      >
      
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            color="success"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot" onClick={showPopup} variant="body2">
                Forgot Username/password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/Signup" variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
