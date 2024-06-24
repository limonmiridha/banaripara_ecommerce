import api from '@/api';

const fetchCategoryWiseProduct = async (category: any) => {
  const response = await fetch(api.CategoryWiseProduct.url, {
    method: api.CategoryWiseProduct.method,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ category }),
  });

  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchCategoryWiseProduct;
