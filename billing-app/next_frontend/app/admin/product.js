// app/page.js
"use client";
import { useEffect, useState } from 'react';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [stockNumber, setStockNumber] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/product',{
          cache: 'no-store',
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/product/add', {
        cache: 'no-store', 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, price, stockNumber }),
      });
      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setName('');
      setCompany('');
      setPrice('');
      setStockNumber('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Number"
          value={stockNumber}
          onChange={(e) => setStockNumber(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        <h2>Products List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.company} - ₹{product.price} - Stock: {product.stockNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
