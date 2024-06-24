'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '@/helpers/displayCurrency';

type Props = {
  product: {
    productName: string;
    productImage: string[];
    price: number;
  };
  fetchAllProduct: any;
};

const AdminProductCard = ({ product, fetchAllProduct }: Props) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-3 rounded w-52 h-fit">
      <Image
        src={product.productImage[0]}
        width={140}
        height={140}
        className="w-40 h-24 object-contain mx-auto"
        alt="product"
      />
      <div className="flex items-center justify-between mt-2 ">
        <h2 className="line-clamp-1">{product?.productName}</h2>

        <div
          onClick={() => setEditProduct(true)}
          className="bg-green-200 hover:bg-green-600 p-2 rounded-full hover:text-white cursor-pointer"
        >
          <MdModeEditOutline />
        </div>
      </div>
      <p className="font-semibold">{displayCurrency(product?.price)}</p>
      {editProduct && (
        <AdminEditProduct
          product={product}
          onClose={() => setEditProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
