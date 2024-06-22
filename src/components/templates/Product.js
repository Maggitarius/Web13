import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import './App.css';
import './Product.css';
import Footer from './Footer';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Эмуляция загрузки данных
    const fetchData = () => {
      try {
        // Ваши статические данные из JSON-файла
        const staticData = {
          products: [
            {
              id: "1",
              name: "Sofa Modern",
              price: 499.99,
              quantity: 10,
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUYu-VZtgVAtiJtY0JXTHPH94hiTIcGN5G_w&s",
              description: "Современный диван с мягкой обивкой и стильным дизайном. Идеально подходит для гостиной."
            },
            {
              id: "2",
              name: "Dining Table Set",
              price: 799.99,
              quantity: 5,
              image: "https://furniture123.co.uk/Images/BUNRNE00187524_1_Supersize.jpg?v=15",
              description: "Комплект обеденного стола и 6 стульев, выполненный из высококачественного дерева."
            },
            {
              id: "3",
              name: "Wardrobe Classic",
              price: 599.99,
              quantity: 3,
              image: "https://whitecompany.scene7.com/is/image/whitecompany/Classic-Large-Wardrobe/CLFLW_AW13_15_F?$D_PDP_412x412$",
              description: "Классический шкаф с 3 дверями и большим количеством места для хранения."
            },
            {
              id: "4",
              name: "Office Chair Ergonomic",
              price: 249.99,
              quantity: 8,
              image: "https://media.4rgos.it/s/Argos/8340865_R_SET?$Main768$&w=620&h=620",
              description: "Эргономичное офисное кресло с поддержкой поясницы и регулируемой высотой."
            },
            {
              id: "5",
              name: "Bed King Size",
              price: 899.99,
              quantity: 15,
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgmWwn-HIxqxhsEf19KZzXRYI4eYGyxjZang&s",
              description: "Кровать King Size с мягким изголовьем и прочным каркасом. Идеальна для комфортного сна."
            },
            {
              id: "6",
              name: "Bookshelf Modern",
              price: 199.99,
              quantity: 7,
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtDm7EJmE_dpKX2gzXnZGi8rLDhcyepKdrQw&s",
              description: "Современный книжный шкаф с множеством полок для хранения книг и декора."
            },
            {
              id: "7",
              name: "Coffee Table Minimalist",
              price: 149.99,
              quantity: 4,
              image: "https://m.media-amazon.com/images/I/716e9A-NIBL.jpg",
              description: "Минималистичный кофейный столик с чистыми линиями и прочной конструкцией."
            },
            {
              id: "8",
              name: "TV Stand Elegant",
              price: 299.99,
              quantity: 9,
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl2EJo1os5vT0RgLXERE3GWBV1hlLbvHVZvg&s",
              description: "Элегантная ТВ-тумба с местом для хранения и современным дизайном."
            },
            {
              id: "9",
              name: "Armchair Cozy",
              price: 199.99,
              quantity: 12,
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxokJ1RKJ7yOSqzOZemUTeL5LiFqefgka_8w&s",
              description: "Уютное кресло с мягкой обивкой и поддержкой для спины. Идеально для отдыха."
            },
            {
              id: "10",
              name: "Dining Chair Set of 4",
              price: 249.99,
              quantity: 11,
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4grkbv2lUGr7Lz7UV48v4DPgNShSpAom69A&s",
              description: "Набор из 4 обеденных стульев с мягкой обивкой и прочной конструкцией."
            }
          ]
        };

        setProducts(staticData.products);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        setError('Ошибка при загрузке товаров.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <div className="product-list">
        <h1>Каталог товаров</h1>
        <div className="products">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>Цена: ${product.price}</p>
                <p>Количество: {product.quantity}</p>
                <p>Описание: {product.description}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="go-to-home">
          <Link to="/">На главную</Link>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Product;
