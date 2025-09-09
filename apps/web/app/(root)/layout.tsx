import Header from '@/components/Header';
import React, { PropsWithChildren } from 'react';

import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { DockDemo } from '@/components/Dock';

const layout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <div className="md:p-5 md:px-5 md:max-w-6xl p-3 max-w-screen mx-auto">
      <Header />
      {children}
      <DockDemo />
    </div>
  );
};

export default layout;
