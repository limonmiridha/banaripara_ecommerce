import AdminSidebar from '@/views/appbars/AdminSidebar';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default layout;
