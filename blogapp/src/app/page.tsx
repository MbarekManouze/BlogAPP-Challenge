"use client"
import { useEffect } from "react";
import Maincontent  from "../components/maincontent"
import { NextApiRequest } from "next";
import { useRouter } from "next/navigation";
import cookie from 'js-cookie'; 


export default function Home(req: NextApiRequest) {

  const router = useRouter()

  useEffect(() => {
    const token = cookie.get('token');

    if (!token)
        router.push('/login');
  })

  return (
      <div className="">
        <Maincontent />
      </div>
    );
}

