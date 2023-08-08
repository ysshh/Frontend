import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  TextField,
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import Grid from '@mui/material/Grid';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import InfoIcon from '@mui/icons-material/Info';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Checkbox from '@mui/material/Checkbox';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/todos/todos', {
        headers: {
          Authorization: token,
        },
      });
      if (response.data) {
        setTodos(response.data.data);
      } else {
        console.error('Error retrieving todos:', response.data.error);
      }
    } catch (error) {
      console.error('Error retrieving todos:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    const createTodoDto = { title: trimmedTitle, description: trimmedDescription, status, completed: false };
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/todos/add', createTodoDto, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data) {
        setSuccessMessage("Todo Created Successfully");
        fetchTodos();
        setTitle('');
        setDescription('');
        setStatus('pending');
      } else {
        console.error('Error creating todo:', response.data.error);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleCompleteTodo = async (todoId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`/todos/update/${todoId}`, { status: 'completed' }, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data) {
        fetchTodos();
      } else {
        console.error('Error completing todo:', response.data.error);
      }
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleDeleteTodo = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`/todos/delete/${deleteTodo}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data) {
        fetchTodos();
      } else {
        console.error('Error deleting todo:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/todos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleEditingTitleChange = (event) => {
    setEditingTodo({
      ...editingTodo,
      title: event.target.value,
    });
  };

  const handleEditingDescriptionChange = (event) => {
    setEditingTodo({
      ...editingTodo,
      description: event.target.value,
    });
  };
  const handleUpdate = async (event) => {
    event.preventDefault();

    const trimmedTitle = editingTodo.title.trim();
    const trimmedDescription = editingTodo.description.trim();

    const updatedTodo = {
      ...editingTodo,
      title: trimmedTitle,
      description: trimmedDescription,
    };
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch(`/todos/update/${editingTodo._id}`, updatedTodo, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data) {
        setSuccessMessage("Todo Updated Successfully");
        fetchTodos();
        setIsEditing(false);
        setEditingIndex(null);
        setEditingTodo(null);
      } else {
        console.error('Error updating todo:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCheckboxChange = (event, todoId) => {
    if (event.target.checked) {
      setSelectedTodos([...selectedTodos, todoId]);
    } else {
      setSelectedTodos(selectedTodos.filter(id => id !== todoId));
    }
  };

  const handleBulkDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await Promise.all(
        selectedTodos.map(todoId =>
          axios.delete(`/todos/delete/${todoId}`, {
            headers: {
              Authorization: token,
            },
          })
        )
      );
      fetchTodos();
      setSelectedTodos([]); // Clear the selected todos after deletion
    } catch (error) {
      console.error('Error deleting todos:', error);
    }
  };
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'bulkDelete') {
      handleBulkDelete();
    } else if (selectedValue === 'update') {
      // Call the function to handle the update action
    }
  };


  return (
    <div>
      <Grid
        container
        justifyContent="center"
        backgroundColor='skyblue'
      >
        <Grid item>
          <h1>TODO App</h1>
        </Grid>
      </Grid>
      <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          component={Link}
          to={`/`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          {<ExitToAppRoundedIcon />}
          Logout
        </Button>

        <TextField
          label="Title"
          value={isEditing ? editingTodo.title : title}
          onChange={isEditing ? handleEditingTitleChange : handleTitleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={isEditing ? editingTodo.description : description}
          onChange={isEditing ? handleEditingDescriptionChange : handleDescriptionChange}
          fullWidth
          required
          margin="normal"
        />

        {successMessage && <p>{successMessage}</p>}
        <Button type="submit" variant="contained" color="primary" margin="normal" >
          {<CreateSharpIcon />}
          {isEditing ? "Update Todo" : "Create Todo"}
        </Button>
      </form>
      <TableCell>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to={`/movie`}
        >
          {<MovieFilterIcon />}
          Movies
        </Button>
      </TableCell>
      <br></br>
      <div style={{ marginLeft: '10px' }}>
        <Button type="submit" variant="contained" color="secondary">
          {<FileUploadIcon />}
          upload
        </Button>

        <br></br><br></br>
        
        <input type="file" onChange={handleUpload} />
        {/* <Checkbox
          checked={selectedTodos.length === todos.length}
          onChange={event =>
            setSelectedTodos(
              event.target.checked ? todos.map(todo => todo._id) : []
            )
          }
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBulkDelete}
          disabled={selectedTodos.length === 0}
        >
          <DeleteForeverIcon />
          Bulk Delete
        </Button> */}
       <TableCell>  <Button color='secondary'>
        <select onChange={handleDropdownChange}>
          <option value="">Select an action</option>
         <option value="bulkDelete"  checked={selectedTodos.length === todos.length}
                  onChange={event =>
                    setSelectedTodos(
                      event.target.checked ? todos.map(todo => todo._id) : []
                    )
                  }>
               
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBulkDelete}
                  disabled={selectedTodos.length === 0}
                >
                  <DeleteForeverIcon />
                  Bulk Delete
                </Button></option>
          <option value="update">Update</option>
        </select></Button>
      </TableCell>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>
            <Checkbox
                  checked={selectedTodos.length === todos.length}
                  onChange={event =>
                    setSelectedTodos(
                      event.target.checked ? todos.map(todo => todo._id) : []
                    )
                  }
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBulkDelete}
                  disabled={selectedTodos.length === 0}
                >
                  <DeleteForeverIcon />
                  Bulk Delete
                </Button>
      </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Send Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Delete
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Details
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  Update
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow key={todo._id}>
              <TableCell>
                  <Checkbox
                    value={todo._id}
                    checked={selectedTodos.includes(todo._id)}
                    onClick={(event) => handleCheckboxChange(event, todo._id)}
                  />
                </TableCell>

                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>
                  {todo.status === 'pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCompleteTodo(todo._id)}
                      >
                        {<MarkEmailReadIcon />}
                        Complete
                      </Button>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setDeleteTodo(todo._id);
                      setIsDeleteDialogOpen(true);
                    }}
                    startIcon={<DeleteForeverIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/todos/new/${todo._id}`}
                  >
                    {<InfoIcon />}
                    Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditingTodo(todo);
                      setEditingIndex(index);
                      setIsEditing(true);
                    }}
                    style={{

                      backgroundColor: 'green',
                      color: 'white',
                    }}
                  >
                    {<CreateSharpIcon />}
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteTodo}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default TodoApp;
