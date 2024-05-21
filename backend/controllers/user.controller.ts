import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { UserRequest } from '../types/user';

async function userSignUp(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please Provide required field!');
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error('User already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role: 'General',
    });
    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      success: true,
      message: 'User created successfully',
      username,
      email,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please provide all information!');
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not Exist! Please Register!');
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
        expiresIn: '1d',
      });
      const tokenOptions = {
        httpOnly: true,
        secure: true,
      };
      res.cookie('token', token, tokenOptions).json({
        message: 'Login Successful',
        success: true,
        data: token,
      });
    } else {
      throw new Error('Password is incorrect!');
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function userDetails(req: UserRequest, res: Response) {
  try {
    const user = await User.findById(req?.user).select('-password');
    res.status(200).json({
      message: 'User Found',
      success: true,
      error: false,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
}

async function logoutUser(req: Request, res: Response) {
  try {
    res.clearCookie('token');
    res.json({
      message: 'Logged out successfully.',
      success: true,
      data: [],
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
}

async function allUsers(req: UserRequest, res: Response) {
  try {
    const allUser = await User.find();
    res.json({
      message: 'All User',
      data: allUser,
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { user, email, username, role } = req.body;
    console.log(user, email, username, role);
    const payload = {
      ...(email && { email: email }),
      ...(username && { username: username }),
      ...(role && { role: role }),
    };
    const updateUser = await User.findByIdAndUpdate(user, payload);
    res.json({
      message: 'User Information Updated',
      success: true,
      data: updateUser,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
    });
  }
}

export { userSignUp, loginUser, userDetails, logoutUser, allUsers, updateUser };
