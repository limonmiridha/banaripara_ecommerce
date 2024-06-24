import { Request, Response } from 'express';
import productModel from '../models/product.model';
import { UserRequest } from '../types/user';
import { uploadProductPermission } from '../helpers/permission';

async function uploadProduct(req: UserRequest, res: Response) {
  try {
    const sessionUserId = req.user;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error('Permission denied');
    }
    const UploadProduct = new productModel(req.body);
    const saveProduct = await UploadProduct.save();
    res.status(201).json({
      message: 'Product uploaded successfully',
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

// Get Products
async function getProduct(req: Request, res: Response) {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });
    res.json({
      message: 'All Products',
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

// Edit Products
async function editProduct(req: UserRequest, res: Response) {
  try {
    if (!uploadProductPermission(req?.user)) {
      throw new Error('Permission denied!');
    }
    const { _id, ...restBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, restBody);

    res.json({
      message: 'Product Update Successfully',
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

// Get product by category

async function getCategoryProduct(req: Request, res: Response) {
  try {
    const productCategory = await productModel.distinct('category');
    console.log(productCategory);
    const productByCategory: any = [];
    for (const category of productCategory) {
      const product = await productModel.findOne({ category } as any);
      if (product) {
        productByCategory.push(product);
      }
    }
    res.json({
      message: 'Product of Category',
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function getCategoryWiseProduct(req: Request, res: Response) {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });

    res.json({
      data: product,
      message: 'Category wise product',
      success: true,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

async function getProductDetails(req: Request, res: Response) {
  try {
    const { productId } = req?.body;
    console.log(productId);
    const product = await productModel.findById(productId);

    res.json({
      data: product,
      message: 'Product Details Found',
      success: true,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export {
  uploadProduct,
  getProduct,
  editProduct,
  getCategoryProduct,
  getCategoryWiseProduct,
  getProductDetails,
};
