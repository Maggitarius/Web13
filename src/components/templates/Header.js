import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="header-link">Главная</Link>
        <Link to="/catalog" className="header-link">Каталог</Link>
        <Link to="/favorites" className="header-link">Избранное</Link>
        <Link to="/cart" className="header-link">Корзина</Link>
      </nav>
    </header>
  );
};

export default Header;
