"use client"
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('/api/register', {
        name, 
        email,
        password,
      });
      console.log(response.data.token);
  
      console.log('Email:', email);
      console.log('Password:', password);
    }
    catch(error){}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="name"
              id="name"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
