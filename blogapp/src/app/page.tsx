"use client"

import Maincontent  from "../components/maincontent"
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
      const token = cookie.get('token');
  
      console.log("token : ", token);
      if (!token) {
        router.push('/login');
      }
    }, [router]);
  

  return (
      <div className="">
        <Maincontent />
      </div>
    );
}

