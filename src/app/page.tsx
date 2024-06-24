'use client';

import { useUser } from '@/context/UserContext';
import HomePage from '@/views/Homepage';

export default function Home() {
  const user: any = useUser();

  return (
    <div className="">
      <HomePage />
      <p>{user?.data?.username}</p>
    </div>
  );
}
