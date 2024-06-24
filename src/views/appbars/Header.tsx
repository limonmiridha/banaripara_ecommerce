'use client';
import api from '@/api';
import role from '@/api/role';
import DefaultButton from '@/components/Button/DefaultButton';
import { setUserDetails } from '@/store/userSlice';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GrSearch } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Header = () => {
  const [userMenu, setUserMenu] = useState(false);
  const user = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = async () => {
    const logoutUser = await fetch(api.logout.url, {
      method: api.logout.method,
      credentials: 'include',
    }).then((res) => res.json());
    console.log(logoutUser);

    if (logoutUser.success) {
      toast.success(logoutUser.message);
      dispatch(setUserDetails(null) as any);
    }
    if (logoutUser.error) {
      toast.error(logoutUser.message);
    }
  };

  return (
    <div className="h-20 bg-white justify-betweens shadow px-6 py-2 sticky top-0 z-20">
      <Link href={'/'} className="text-2xl font-semibold">
        Logo
      </Link>
      <div className="max-md:hidden relative">
        <input
          type="text"
          placeholder="Search here..."
          className="w-80 p-2 border rounded-full focus:outline-none focus:shadow"
        />
        <GrSearch className="w-8 h-full p-2 text-white absolute top-1/2 right-0 -translate-y-1/2 bg-red-600 rounded-r-full" />
      </div>
      <div className="flexs gap-4">
        <div className="relative">
          <FaShoppingCart size={24} />
          <p className="w-5 h-5 text-white absolute -top-1.5 -right-2 -translate-y-1/2 bg-red-600 rounded-full m-auto justify-centers">
            0
          </p>
        </div>
        <div className=" relative">
          <div
            onClick={() => setUserMenu(!userMenu)}
            className="cursor-pointer"
          >
            {user &&
              (user.profilePicture ? (
                <img src={user.profilePicture} alt="" />
              ) : (
                <img src="/images/user.png" width={24} alt="" />
              ))}
          </div>
          {userMenu && (
            <div className=" absolute top-8 left-1/2 -translate-x-1/2 w-max p-2 bg-white shadow rounded">
              {user?.user?.role === role.Admin && (
                <Link
                  href={'/admin'}
                  className="hover:text-blue-600"
                  onClick={() => setUserMenu(!userMenu)}
                >
                  Admin Panel
                </Link>
              )}
              <p>Test</p>
              <p>Test</p>
            </div>
          )}
        </div>
        {user?.user?._id ? (
          <DefaultButton onClick={handleLogout}>Logout</DefaultButton>
        ) : (
          <Link
            href={'/login'}
            className="bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 text-white"
          >
            Login
          </Link>
        )}

        {/* <FaRegCircleUser /> */}
      </div>
    </div>
  );
};

export default Header;
