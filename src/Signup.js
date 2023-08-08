import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fullName && phoneNumber && email && password) {
      if (!phoneNumber || phoneNumber.length !== 10) {
        setPhoneNumberError(true);
        return;
      } else {
        setPhoneNumberError(false);
      }

      if (!password || password.length < 8) {
        setPasswordError(true);
        return;
      } else {
        setPasswordError(false);
      }

      try {
        const form = {
          fullName: fullName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
        };
        await axios.post('users/signup', form);
        setSignUpSuccess(true);
       alert('Signup succesfull')
        navigate('/');
      } catch (error) {
        console.log(error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all the fields');
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {signUpSuccess ? (
          <Typography component="p" variant="subtitle1" color="success">
            Sign Up Successful!
          </Typography>
        ) : null}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  const onlyNumbers = enteredValue.replace(/[^0-9]/g, '');
                  const formattedNumber = onlyNumbers.slice(0, 10);
                  setPhoneNumber(formattedNumber);
                }}
                error={phoneNumberError}
                helperText={phoneNumberError ? 'Please enter a valid phone number' : ''}
              />
            </Grid>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!isValidEmail(email)}
                helperText={isValidEmail(email) ? '' : 'Please enter a valid email address'}
              />
            </Grid>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? 'Please enter a valid password' : ''}
              />
            </Grid>
          </Box>

          <Button
            type="submit"
            color="success"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Login in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
