"use client"

import Maincontent from "@/components/maincontent";
import { NextApiRequest } from 'next';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cookie from 'js-cookie'; 

const Blogs = (req: NextApiRequest) => {

    const router = useRouter();

    useEffect(() => {
        const token = cookie.get('token');

        console.log("token : ", token)
        if (!token)
            router.push('/login');

    }, [router]);

    return (
        <div>
            <Maincontent />
        </div>
    );

}  

export default Blogs;