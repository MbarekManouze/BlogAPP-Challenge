"use client"

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookie from 'js-cookie'; 
import axios from 'axios';


  const Navbar = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const router = useRouter()

    useEffect(() => {
      const token = cookie.get('token');
  
      if (!token){
        
        console.log("hereeeeeeeeeee\n");  
        router.push('/login');
      }
      else{
        setAuthenticated(true);

      }
    })
  

    const LogoutButton = async () => {

      try{
        await axios.post('/api/logout')
        .then(() => {
          window.location.href = '/login';
        })
      }
      catch(error){

      }
    }

    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
              <h2>Blog</h2>
          </div>
          <div className="flex space-x-4">
            {!isAuthenticated && (
              <>
                <Link href="/login" className='text-white'>
                    Login
                </Link>
                <Link href="/signup" className='text-white'>
                    Sign Up
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <button className= 'bg-transparent px-4 py-2 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'>
                  <Link href="/add-blog" className='text-white'>
                    add post
                  </Link>
                </button>
      
                <button className='text-white bg-transparent px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                  onClick={() => LogoutButton()}
                  >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };
  
export default Navbar;
  