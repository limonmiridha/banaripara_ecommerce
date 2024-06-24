import api from '@/api';
import { toast } from 'react-toastify';

const addToCart = async (e: any, id: string) => {
  e?.stopPropagation();
  e?.preventDefault();
  const response = await fetch(api.addToCart.url, {
    method: api.addToCart.method,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  });

  const responseData = await response.json();
  if (responseData.success) {
    toast.success(responseData.message);
  }
  if (responseData.error) {
    toast.error(responseData.message);
  }
};

export default addToCart;
