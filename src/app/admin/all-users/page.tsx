'use client';
import api from '@/api';
import EditUser from '@/components/admin/EditUser';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';

const page = () => {
  const [allUser, setAllUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState();

  const fetchAllUser = async () => {
    const allUser = await fetch(api.allUser.url, {
      method: api.allUser.method,
      credentials: 'include',
    }).then((res) => res.json());
    if (allUser.success) {
      setAllUser(allUser.data);
    }
    if (allUser.error) {
      toast.error(allUser.message);
    }
    console.log('user', allUser);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div>
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>SL.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user: any, i: number) => (
            <tr key={user._id}>
              <td>{i + 1}</td>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format('ll')}</td>
              <td className="flex items-center justify-center gap-2">
                <button
                  className="bg-green-100 hover:bg-green-300 p-1 rounded-full hover:text-white"
                  onClick={() => {
                    setUpdateUser(user);
                    setIsOpen(true);
                  }}
                >
                  <AiOutlineEdit />
                </button>
                <button className="bg-red-100 hover:bg-red-300 p-1 rounded-full hover:text-white">
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <EditUser
          onClose={() => setIsOpen(false)}
          updatedData={updateUser}
          fetchUpdate={fetchAllUser}
        />
      )}
    </div>
  );
};

export default page;
