
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get('token');

    console.log("token : ", token);
    if (!token) {
      router.push('/login');
    }
  }, [router]);
};
