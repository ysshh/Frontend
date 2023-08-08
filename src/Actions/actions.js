import { addToCart, removeFromCart, getCartTotal } from "./cartSlice.js"; 


const addMovieToCart = (movie) => {
  return (dispatch) => {
    dispatch(addToCart(movie));
    dispatch(getCartTotal());
  };
};

const removeMovieFromCart = (movieId) => {
  return (dispatch) => {
    dispatch(removeFromCart(movieId));
    dispatch(getCartTotal());
  };
};

export { addMovieToCart, removeMovieFromCart };
