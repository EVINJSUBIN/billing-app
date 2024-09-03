// app/dashboard/page.js
"use client";
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import './style.css';
export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      if (!role || role !== 'user') {
        router.push('/login');
      }
    }
  }, [router]);
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    }
    router.push('/login');
  };
  return (
    <div className='hi'>
      <h1>Billing Area </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
