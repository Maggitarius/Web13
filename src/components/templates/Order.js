import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Header from './Header.js';
import Captcha from '../templates/Capthca.js';
import '../templates/App.css';
import Footer from './Footer.js'

const Order = () => {
  const location = useLocation();
  const { cart } = location.state || { cart: [] }; 
  const [formData, setFormData] = useState({
    address: '',
    fullName: '',
    paymentMethod: '',
    cart: cart, 
    totalCost: 0,
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      address: formData.address,
      fullName: formData.fullName,
      paymentMethod: formData.paymentMethod,
      cart: formData.cart.map(item => `${item.name}: ${item.price} x ${item.quantity}`).join('\n'),
      totalCost: formData.totalCost,
    };

    emailjs.send(
      'service_d0eawbk',
      'template_9g6rx3p',
      templateParams,
      'b_jC1kIvW98EThCZB'
    ).then((result) => {
      console.log('Email sent successfully:', result.text);
    }, (error) => {
      console.error('Error sending email:', error.text);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaPassed) {
      alert('Пожалуйста, пройдите капчу.');
      return;
    }
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:3000/orders', formData);
      console.log('Server Response:', response.data);
      if (response.status === 201) {
        setOrderSuccess(true);
        setOrderError(false);
        setFormData({
          address: '',
          fullName: '',
          paymentMethod: '',
          cart: [],
          totalCost: 0,
        });
        sendEmail(e);
      } else {
        setOrderError(true);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setOrderError(true);
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100vw', 
      scale: 0.8, 
    },
    animate: {
      opacity: 1,
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut', 
      },
    },
    exit: {
      opacity: 0,
      x: '100vw', 
      scale: 0.8, 
      transition: {
        duration: 0.5,
        ease: 'easeInOut', 
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      <div className="order-page">
        <h1>Заказ</h1>
        <form onSubmit={handleSubmit} className="order-form">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Выберете метод оплаты</option>
            <option value="creditCard">Карта</option>
            <option value="payPal">PayPal</option>
            <option value="cashOnDelivery">Деньгами курьеру</option>
          </select>
          <Captcha onCaptchaChange={setCaptchaPassed} />
          <button type="submit">Оформить заказ</button>
        </form>
        {orderSuccess && <p className="success-message">Заказ сделан!</p>}
        {orderError && <p className="error-message">Ошибка заказа! Пожалуйста, попробуйте снова.</p>}
        <div className="go-to-home">
          <Link to="/">Главная</Link>
        </div>
      </div>
    </motion.div>

  );

};

export default Order;