"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleClientScriptLoad } from 'next/script';
export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const productResponse = await fetch('/api/product');
      const productsData = await productResponse.json();
      setProducts(productsData);

      const userResponse = await fetch('/api/users');
      const usersData = await userResponse.json();
      setUsers(usersData);
    }
    fetchData();
  }, []);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      if (!role || role !== 'admin') {
        router.push('/login');
      }
    }
  }, [router]);
  const handleAddProduct = async () => {
    const response = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: productName, price: productPrice, stock: productStock }),
    });
    const newProduct = await response.json();
    setProducts([...products, newProduct]);
    setProductName('');
    setProductPrice('');
    setProductStock('');
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
  
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
  
      // Try to parse the response JSON
      const newUser = await response.json();
      
      // Update the state with the new user
      setUsers([...users, newUser]);
  
      // Clear the form fields
      setUsername('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('There was an issue adding the user. Please try again.');
    }
  };
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    }
    router.push('/login');
  };

  return (
    <div>
      <h1>Product and User Management</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <div>
        <h2>Products List</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ₹{product.price} - Stock: {product.stock}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              Username: {user.username}, Role: {user.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
