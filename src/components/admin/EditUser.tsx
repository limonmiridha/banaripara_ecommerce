'use client';
import role from '@/api/role';
import React, { useState } from 'react';
import DefaultButton from '../Button/DefaultButton';
import { IoMdClose } from 'react-icons/io';
import api from '@/api';
import { toast } from 'react-toastify';

const EditUser = ({ updatedData, fetchUpdate, onClose }: any) => {
  console.log(updatedData);
  const [userInfo, setUserInfo] = useState(updatedData.role);
  const updateUser = async () => {
    const updateUser = await fetch(api.updateUser.url, {
      method: api.updateUser.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: updatedData._id,
        role: userInfo,
      }),
    }).then((res) => res.json());
    if (updateUser.success) {
      fetchUpdate();
      toast.success(updateUser.message);
      onClose();
    }
    console.log('update', updateUser, userInfo);
  };
  return (
    <div className="grid space-y-4 bg-white shadow absolute top-1/2 left-1/2 -translate-1/2 max-w-sm w-full p-5 rounded-md">
      <IoMdClose className="block ml-auto cursor-pointer" onClick={onClose} />
      <h2 className="text-xl font-semibold">Edit User Info</h2>

      <p>Name: {updatedData?.username}</p>
      <p>Email: {updatedData?.email}</p>
      <select
        className="border p-2"
        value={userInfo}
        onChange={(e) => setUserInfo(e.target.value)}
      >
        {Object.values(role).map((userRole, i) => (
          <option value={userRole} key={userRole}>
            {userRole}
          </option>
        ))}
      </select>
      <DefaultButton className="mx-auto" onClick={updateUser}>
        Change
      </DefaultButton>
    </div>
  );
};

export default EditUser;
