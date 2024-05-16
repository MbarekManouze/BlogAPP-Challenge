"use client"

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookie from 'js-cookie'; 


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
                <Link href="/add-blog" className='text-white'>
                  add post
                </Link>
      
                <Link href="/logout " className='text-white'>
                Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  };
  
export default Navbar;
  