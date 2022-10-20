import React from "react";
import "./Cart.css";

const Cart = ({ cart, clearCart, children }) => {
  // console.log(cart);

  let total = 0,
    shipping = 0,
    quantity = 0;
  for (const product of cart) {
    total = total + product.price * product.quantity;
    quantity = quantity + product.quantity;
    shipping = shipping + product.shipping;
  }

  const tax = total * 0.1;

  return (
    <div className="cart">
      <h4>Order Summmery</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total price: ${total}</p>
      <p>Total shipping: ${shipping}</p>
      <p>Tax: ${parseFloat(tax.toFixed(2))}</p>
      <h5>Grand Total: ${total + shipping + tax}</h5>
      <button onClick={clearCart}>Clear Cart</button>
      {children}
    </div>
  );
};

export default Cart;
