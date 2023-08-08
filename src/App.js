import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
import TodoApp from './todo';
import TodoDetails from './detail';
// import Movies from './movies';
// import CartPage from './Component/cartPage';
import Movie from './movie';
import Moviedata from './moviedata';
import Forgot from './forgot';
import Game from './Game';
import Updatepassword from './updatepassword';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoApp />} />
          {/* <Route path="/detail" element={<TodoDetails />} /> */}
          <Route path="/todos/new/:id" element={<TodoDetails/>} />
          {/* <Route path="/movies" element={<Movies/>} /> */}
          {/* <Route path="/cartPage" element={<CartPage/>} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/moviedata" element={<Moviedata />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/updatepassword" element={<Updatepassword />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
