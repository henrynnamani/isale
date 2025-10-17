'use client';

import { parseCookies } from 'nookies';
import React, { PropsWithChildren, useEffect } from 'react';

const layout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <div className="md:p-5 md:px-5 md:max-w-6xl p-3 max-w-screen mx-auto">
      {children}
    </div>
  );
};

export default layout;
