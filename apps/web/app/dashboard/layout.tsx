'use client';

import api from '@/axios-base';
import { parseCookies } from 'nookies';
import React, { PropsWithChildren, useEffect } from 'react';

const layout = ({ children }: Readonly<PropsWithChildren>) => {
  const cookies = parseCookies();

  console.log(cookies);

  useEffect(() => {
    api.defaults.headers['authorization'] = `Bearer ${cookies.accessToken}`;
  }, []);

  return (
    <div className="md:p-5 md:px-5 md:max-w-6xl p-3 max-w-screen mx-auto">
      {children}
    </div>
  );
};

export default layout;
