import express from 'express';
import {
  allUsers,
  loginUser,
  logoutUser,
  updateUser,
  userDetails,
  userSignUp,
} from '../controllers/user.controller';
import authToken from '../middlewares/authToken';

const router = express.Router();

router.post('/register', userSignUp);
router.post('/login', loginUser);
router.get('/profile', authToken, userDetails);
router.get('/logout', logoutUser);

// admin
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

export default router;
