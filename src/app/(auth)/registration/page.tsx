'use client';
import api from '@/api';
import imageToBase64 from '@/helpers/imageToBase64';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const page = () => {
  const [data, setData] = useState<any>();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
      profilePicture: await imageToBase64(formData.get('profile-picture')),
    };
    // setData(userData);
    if (userData.password === userData.confirmPassword) {
      const user = await fetch(api.signUp.url, {
        method: api.signUp.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
      if (user.success) {
        toast.success(user.message);
        router.push('/login');
      }
      if (user.error) {
        toast.error(user.message);
      }
      console.log(user);
    } else {
      toast.error('Check password and confirm password');
    }
  };

  return (
    <div className=" h-[calc(100vh-80px)] justify-centers">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 rounded-md"
      >
        <div className="relative mx-auto w-28 h-28">
          <Image
            src={data?.profilePicture || '/images/user.png'}
            width={100}
            height={100}
            alt=""
            className="mx-auto w-full h-full rounded-full"
          />
          <label htmlFor="file">
            <div className="bg-white bg-opacity-40 w-full h-10 absolute bottom-0 text-center cursor-pointer">
              <p className=" font-bold">Upload</p>
              <input
                id="file"
                type="file"
                name="profile-picture"
                className="hidden"
              />
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="username">Username:</label> <br />
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Enter your username..."
            className="border w-full p-2 rounded"
          />
        </div>
        <br />
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
              type={showPassword.password ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password..."
              className="border w-full p-2 rounded"
            />
            <div
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer select-none"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label> <br />
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm password..."
              className="border w-full p-2 rounded"
            />
            <div
              onClick={() =>
                setShowPassword((prev) => {
                  return {
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  };
                })
              }
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer select-none"
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <br />
        <button className="bg-red-600 px-4 py-2 rounded text-white">
          Registration
        </button>
        <div className="mt-3">
          <span>Already have an account? </span>
          <Link href={'/login'} className="underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
