"use client"
import BlogForm from "@/components/addbloForm";
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';
import { useEffect } from 'react';

const Form = () => {
    const router = useRouter();

    useEffect(() => {
        const token = cookie.get('token');
    
        console.log("token : ", token);
        if (!token) {
          router.push('/login');
        }
      }, [router]);

    return (
        <>
            <BlogForm />
        </>
    );

}

export default Form;