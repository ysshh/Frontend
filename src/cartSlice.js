
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cart: [], 
//   cartItemCount: 0,
  
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.cart.push(action.payload);
//       state.cartItemCount += 1;
//     },
   
//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((item) => item.Title !== action.payload.Title);
//       state.cartItemCount -= 1;
//     },
//     clearCart: (state) => {
//       state.cart = [];
//       state.cartItemCount = 0;
//     },
   
   
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;











// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   cart: [],
// //   totalQuantity: 0,
// //   totalPrice: 0,
// // };

// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     addToCart: (state, action) => {
// //       const { title, price } = action.payload;
// //       const existingItem = state.cart.find((item) => item.title === title);
// //       if (existingItem) {
// //         existingItem.quantity += 1;
// //       } else {
// //         state.cart.push({ title, price, quantity: 1 });
// //       }
// //     },
// //     removeFromCart: (state, action) => {
// //       const title = action.payload;
// //       state.cart = state.cart.filter((item) => item.title !== title);
// //     },
// //     getCartTotal: (state) => {
// //       const { totalQuantity, totalPrice } = state.cart.reduce(
// //         (cartTotal, cartItem) => {
// //           const { price, quantity } = cartItem;
// //           const itemTotal = price * quantity;
// //           cartTotal.totalPrice += itemTotal;
// //           cartTotal.totalQuantity += quantity;
// //           return cartTotal;
// //         },
// //         {
// //           totalPrice: 0,
// //           totalQuantity: 0,
// //         }
// //       );
// //       state.totalPrice = totalPrice;
// //       state.totalQuantity = totalQuantity;
// //     },
// //   },
// // });

// // export const {
// //   addToCart,
// //   removeFromCart,
// //   getCartTotal,
// // } = cartSlice.actions;

// // export default cartSlice.reducer;
