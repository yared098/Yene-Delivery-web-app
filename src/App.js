import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
// import { useLocation } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
const { getData } = require("./db/db");
const foods = getData();


const tele = window.Telegram.WebApp;

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const jsonData = queryParams.get('data');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      setProducts(parsedData);
    }
  }, []);

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const jsonData = searchParams.get('data');
  // const products = JSON.parse(jsonData);
  // console.log(products)


  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tele.ready();
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
  };

  return (
    <>
      <h1 style={{ background: "red" }} className="heading">Order Food</h1>

      <div style={{ background: "green" }}>
        <h1 style={{ background: "green" }}>Product Grid View</h1>
      <h1>Product Grid View</h1>
      {products.length === 0 ? (
        <p style={{background:"green"}}>No data is found.</p>
      ) : (
        <div className="grid-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>Price: {product.price}</p>
              {/* Add more product details or components as needed */}
            </div>
          ))}
        </div>
      )}
        <p>wellcome</p>
      </div>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <p>add new addad</p>
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}

export default App;
