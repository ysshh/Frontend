import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UpdatePassword from './updatepassword';
const Forgot = ()=>{
    const [email,setEmail] =useState ('');
    const [resetLink, setResetLink] =useState('');
    const [emailExists, setEmailExists] =useState(false);
    const [userId , setUserId] = useState(null);


  const generateResetLink = async () => {
    try {
      const response = await fetch('/users/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.token) {
          setEmailExists(true);
          const resetToken = data.token;
          const link = `https://localhost3000/reset/${resetToken}`;
          setResetLink(link);
          console.log('Generated password reset token:', resetToken);
        } else {
          setEmailExists(false);
          alert('Token not received.');
        }
      } else {
        setEmailExists(false);
        alert('Email not found.');
      }
    } catch (error) {
      console.error('Error generating reset link:', error);
      alert('An error occurred while generating reset link.');
    }
  };
  const checkEmailExists = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/users/get', {
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      const foundUser = data.find((user) => user.email === email);
      
   
      if (foundUser) {
        setEmailExists(true);
        setUserId(foundUser._id);
      } else {
        setEmailExists(false);
        setUserId(null);
        alert('Email not found.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      alert('An error occurred while checking email.');
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Forgot Password</h1>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" onClick={checkEmailExists}>
            Check Email
          </Button>
          {emailExists && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="contained" onClick={generateResetLink}>
                Generate Password Reset Link
              </Button>
              {resetLink && (
                <p>
                  Click Link to reset Password
                  <br />
                  <Link to={'/updatepassword'}>Reset Link</Link> {/* Updated link */}
                </p>
              )}
            </div>
          )}
        </form>
        {/* Pass the userId to the UpdatePassword component */}
        {emailExists && userId && <UpdatePassword userId={userId} />}
      </div>
    </div>
  );
};

export default Forgot;