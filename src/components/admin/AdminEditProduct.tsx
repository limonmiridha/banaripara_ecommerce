import productCategory from '@/helpers/productCategory';
import uploadImage from '@/helpers/uploadImage';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import DisplayImage from './DisplayImage';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import api from '@/api';
import { toast } from 'react-toastify';

type Props = {};

const AdminEditProduct = ({ product, onClose, fetchAllProduct }: any) => {
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');
  const [data, setData] = useState({
    ...product,
    productName: product?.productName,
    brandName: product?.brandName,
    category: product?.category,
    productImage: product?.productImage || [],
    description: product?.description,
    price: product?.price,
    sellingPrice: product?.sellingPrice,
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e: any) => {
    const file = e.target.files[0];
    const uploadCloudinaryImage = await uploadImage(file);
    setData((prev: any) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadCloudinaryImage.url],
      };
    });
  };

  const handleDelete = async (i: any) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(i, 1);
    setData((prev: any) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(api.editProduct.url, {
      method: api.editProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchAllProduct();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-4 rounded-md w-full max-w-xl overflow-auto h-full">
        <IoMdClose className="block ml-auto cursor-pointer" onClick={onClose} />
        <h2 className="text-lg font-bold">Edit Product</h2>
        <form className="grid p-4 gap-3" onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={(e) => handleOnChange(e)}
            className="p-2 bg-slate-200 focus:bg-white rounded"
          />
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Product Name"
            value={data.brandName}
            onChange={(e) => handleOnChange(e)}
            className="p-2 bg-slate-200 focus:bg-white rounded"
          />
          <label htmlFor="category">Category Name:</label>
          <select
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-200 focus:bg-white rounded"
          >
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div className="flex items-center gap-2">
            {data?.productImage[0] ? (
              data?.productImage.map((img: any, i: number) => (
                <div className="relative group">
                  <Image
                    src={img}
                    width={80}
                    height={80}
                    className="aspect-[3/2] border bg-gray-100 p-1 cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(img);
                    }}
                    alt=""
                  />
                  <AiFillDelete
                    className="absolute bottom-0 right-0 m-1 text-red-400 text-xl hidden group-hover:block hover:scale-105 transition-all cursor-pointer"
                    onClick={() => handleDelete(i)}
                  />
                </div>
              ))
            ) : (
              <p className="text-red-500">*Please Upload Image</p>
            )}
          </div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={(e) => handleOnChange(e)}
            className="p-2 bg-slate-200 focus:bg-white rounded"
          />
          <label htmlFor="sellingPrice">Selling Price:</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            onChange={(e) => handleOnChange(e)}
            className="p-2 bg-slate-200 focus:bg-white rounded"
          />
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter Product Description"
            className="h-28 bg-slate-200 p-2"
            onChange={handleOnChange}
            value={data.description}
          ></textarea>
          <button className="text-white px-3 py-2 bg-red-500 hover:bg-red-600">
            Save Changes
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          img={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
