import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, deleteShoppingCart, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // const [products, setProducts] = useState([]);
  const {products} = useLoaderData();
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  }

  // useEffect(() => {
  //   // console.log('products load before fetch');
  //   fetch("products.json")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  //     // console.log('products loaded');
  // }, []); 

  useEffect(() => {
    // console.log('Local Storage first line', products);
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if(addedProduct){
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
    // console.log('Local Storage finished');

  }, [products]);


  const handleAddToCart = (selectedproduct) => {
    let newCart = [];
    const exists = cart.find(product => product.id === selectedproduct.id);
    if(!exists){
      selectedproduct.quantity = 1;
      newCart = [...cart,  selectedproduct];
    }
    else{
      const rest = cart.filter(product => product.id !== selectedproduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists]
      
      // newCart = [exists];
      // console.log(newCart);
    }
    // newCart = [...cart, selectedproduct];
    setCart(newCart);
    addToDb(selectedproduct.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to="/orders">
          <button>Review Order</button></Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
