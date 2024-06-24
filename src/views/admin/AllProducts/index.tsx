'use client';
import api from '@/api';
import AdminProductCard from '@/components/admin/AdminProductCard';
import UploadProduct from '@/components/admin/UploadProduct';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(api.allProduct.url);
    const data = await response.json();
    console.log(data, 'product');
    setAllProduct(data?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="px-4 py-2 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
        >
          Upload Product
        </button>
      </div>
      <div className="flex flex-wrap gap-3 py-3 h-[calc(100vh-160px)] overflow-y-auto">
        {allProduct.map((product: any, i) => (
          <AdminProductCard
            product={product}
            key={i + 'allProduct'}
            fetchAllProduct={fetchAllProduct}
          />
        ))}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
