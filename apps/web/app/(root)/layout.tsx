import React, { PropsWithChildren } from 'react';

const layout = ({ children }: Readonly<PropsWithChildren>) => {
  return <div className="p-5 px-5 max-w-6xl mx-auto">{children}</div>;
};

export default layout;
