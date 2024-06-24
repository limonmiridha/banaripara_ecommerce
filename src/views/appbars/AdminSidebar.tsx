'use client';
import role from '@/api/role';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AdminSidebar = () => {
  const user = useSelector((state: any) => state?.user);

  //   useEffect(() => {
  //     if (user?.role !== role.Admin) {
  //       redirect('/');
  //     }
  //   }, [user]);

  return (
    <div className="bg-white w-60 min-h-[calc(100vh-82px)]">
      <div className="flex flex-col justify-center items-center bg-slate-100 p-4">
        {user &&
          (user.profilePicture ? (
            <img src={user.profilePicture} alt="" />
          ) : (
            <img src="/images/user.png" width={50} alt="" />
          ))}
        <p className="text-lg font-bold">{user?.user?.username}</p>
        <p className="text-sm">{user?.user?.role}</p>
      </div>
      <div className="grid p-4">
        {navData.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="p-2 hover:bg-slate-50 hover:text-blue-600 rounded"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;

const navData = [
  {
    id: 1,
    title: 'All Users',
    path: '/admin/all-users',
  },
  {
    id: 2,
    title: 'Products',
    path: '/admin/products',
  },
];
