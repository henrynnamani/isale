import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { parseCookies } from 'nookies';
import api from '@/axios-base';
import { ShoppingBag } from 'lucide-react';

const Auth = () => {
  const router = useRouter();
  const cookies = parseCookies();

  console.log(cookies);

  useEffect(() => {
    api.defaults.headers['authorization'] = `Bearer ${cookies.accessToken}`;
  }, [cookies]);

  return cookies?.accessToken ? (
    <div onClick={() => router.push('/cart')} className="flex gap-2 items-center">
      <ShoppingBag size={20}/>
      <p className="font-medium">Cart</p>
    </div>
  ) : (
    <div
      onClick={() => router.push('/auth/signin')}
      className="bg-blue-400 rounded-full items-center justify-center w-30 h-12 hidden md:flex cursor-pointer"
    >
      <span className="text-white font-bold">Login</span>
    </div>
  );
};

export default Auth;
