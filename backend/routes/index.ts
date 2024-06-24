import express from 'express';
import {
  addToCart,
  allUsers,
  cartCounter,
  loginUser,
  logoutUser,
  updateUser,
  userDetails,
  userSignUp,
} from '../controllers/user.controller';
import authToken from '../middlewares/authToken';
import {
  editProduct,
  getCategoryProduct,
  getProduct,
  getProductDetails,
  uploadProduct,
} from '../controllers/product.controller';

const router = express.Router();

router.post('/register', userSignUp);
router.post('/login', loginUser);
router.get('/profile', authToken, userDetails);
router.get('/logout', logoutUser);

// admin
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

// product
router.post('/upload-product', authToken, uploadProduct);
router.get('/all-product', getProduct);
router.post('/edit-product', authToken, editProduct);
router.get('/get-category-product', getCategoryProduct);
router.post('/category-wise-product', getCategoryProduct);
router.post('/product-details', getProductDetails);

// user add to cart
router.post('/add-to-cart', authToken, addToCart);
router.get('/cart-counter', authToken, cartCounter);

export default router;
