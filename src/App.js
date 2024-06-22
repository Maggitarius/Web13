import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/templates/Home.js';
import Catalog from './components/templates/Catalog.js';
import Favorites from './components/templates/Favorites.js';
import Cart from './components/templates/Cart.js';
import Product from './components/templates/Product.js';
import Order from './components/templates/Order.js';
import Header from './components/templates/Header.js';
import './components/templates/App.css';
import Footer from './components/templates/Footer.js';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/order" element={<Order />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
