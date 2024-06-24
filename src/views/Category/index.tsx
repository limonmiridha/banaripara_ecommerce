'use client';
import { useParams } from 'next/navigation';
import React from 'react';

const Category = () => {
  const params = useParams();
  console.log(params.category);
  return <div>{params?.category}</div>;
};

export default Category;
