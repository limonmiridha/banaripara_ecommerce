import api from '@/api';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CategoryProduct = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(api.getCategoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse?.data as any);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 overflow-auto no-scrollbar">
        {categoryProduct.map((product: any, i: number) => (
          <Link
            href={`category/${product?.category}`}
            key={i}
            className="group cursor-pointer"
          >
            <Image
              src={product?.productImage[0]}
              width={40}
              height={40}
              className="w-20 h-20 rounded-full overflow-hidden p-2 bg-white group-hover:scale-105 transition-all"
              alt=""
            />
            <p className="text-center font-semibold mt-2 capitalize">
              {product?.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
