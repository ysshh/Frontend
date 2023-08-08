// // CartPage.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart, clearCart } from '../cartSlice';

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.cart);

//   const handleRemoveFromCart = (item) => {
//     dispatch(removeFromCart(item));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div>
//       <h1>Cart Page</h1>
//       <ul>
//         {Array.isArray(cartItems) &&
//           cartItems.map((item) => (
//             <li key={item.id}>
//               <img src={item.Images} alt='blank' style={{ width: '170px' }} />
//               {item.title} 
//               {item.Actors} 
              
//               <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
//             </li>
//           ))}
//       </ul>
//       <button onClick={handleClearCart}>Remove All</button> 
//     </div>
//   );
// };

// export default CartPage;
