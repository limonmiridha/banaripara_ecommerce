'use client';
import api from '@/api';
import { UserContext, useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginUi = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const user = await fetch(api.signIn.url, {
      method: api.signIn.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then((res) => res.json());
    if (user.success) {
      toast.success(user.message);
      router.push('/');
    } else {
      toast.error(user.message);
    }
  };
  return (
    <div className=" h-[calc(100vh-80px)] justify-centers">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 rounded-md"
      >
        <div>
          <label htmlFor="email">Email:</label> <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            className="border w-full p-2 rounded"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label> <br />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password..."
              className="border w-full p-2 rounded"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer select-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <Link href={'/forget-password'} className="flexs justify-end">
          Forget Password?
        </Link>{' '}
        <br />
        <button className="bg-red-600 px-4 py-2 rounded text-white">
          Login
        </button>
        <div className="mt-3">
          <span>Don't have any account? </span>
          <Link href={'/registration'} className="underline">
            Registration here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginUi;
