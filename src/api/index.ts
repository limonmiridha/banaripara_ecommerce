const baseUrl = 'http://localhost:8080/api';

const api = {
  signUp: {
    url: `${baseUrl}/register`,
    method: 'POST',
  },
  signIn: {
    url: `${baseUrl}/login`,
    method: 'POST',
  },
  profile: {
    url: `${baseUrl}/profile`,
    method: 'GET',
  },
  logout: {
    url: `${baseUrl}/logout`,
    method: 'GET',
  },
  allUser: {
    url: `${baseUrl}/all-users`,
    method: 'GET',
  },
  updateUser: {
    url: `${baseUrl}/update-user`,
    method: 'POST',
  },
  uploadProduct: {
    url: `${baseUrl}/upload-product`,
    method: 'POST',
  },
  allProduct: {
    url: `${baseUrl}/all-product`,
    method: 'GET',
  },
  editProduct: {
    url: `${baseUrl}/edit-product`,
    method: 'POST',
  },
  getCategoryProduct: {
    url: `${baseUrl}/get-category-product`,
    method: 'GET',
  },
  CategoryWiseProduct: {
    url: `${baseUrl}/category-wise-product`,
    method: 'POST',
  },
  productDetails: {
    url: `${baseUrl}/product-details`,
    method: 'POST',
  },
  addToCart: {
    url: `${baseUrl}/add-to-cart`,
    method: 'POST',
  },
  cartCounter: {
    url: `${baseUrl}/cart-counter`,
    method: 'GET',
  },
};

export default api;
