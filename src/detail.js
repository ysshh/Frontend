/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState();

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/todos/new/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setTodo(response.data.todo);
      console.log(response.data.todo);
    } catch (error) {
      console.error('Error retrieving todo:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
    >
      <div>
        <Typography variant="h1">Todo Details</Typography>
        {todo && (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5">{todo.title}</Typography>
              <Typography variant="body1">{todo.description}</Typography>
              <Typography variant="body2">Status: {todo.status}</Typography>
            </Grid>
            <Grid item xs={12}>
              {todo.items ? (
                <List>
                  {todo.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <p>No items available.</p>
              )}
            </Grid>
          </Grid>
        )}
        <div>
      <p>Getting bored? Click on me</p>
      <Link to="/Game">
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Link>
    </div>
      </div>
    </Box>
  );
};

export default Detail;
