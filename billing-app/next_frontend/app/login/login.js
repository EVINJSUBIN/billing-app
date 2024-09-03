// app/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        cache: 'no-store', 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('role', userData.role);  // Store the role in localStorage
          localStorage.setItem('username', username); // Store the username as well
        }
        if (userData.role === "admin"){
              router.push('/admin')
        } else{
          router.push('/dashboard');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="hi1">
      <h1>Login</h1>
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
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
    </div>
  );
}
