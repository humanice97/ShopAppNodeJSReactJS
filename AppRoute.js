import express from 'express';
const router = express.Router();

import * as ProductController from './controllers/ProductController';
import * as UserController from './controllers/UserController';
import * as CategoryController from './controllers/CategoryController';
import * as BrandController from './controllers/BrandController';
import * as OrderController from './controllers/OrderController';
import * as OrderDetailController from './controllers/OrderDetailController';
import asyncHandler from './middlewares/asyncHandler';
import validate from './middlewares/validate';
import InsertProductRequest from './dtos/requests/product/InsertProductRequest';
import UpdateProductRequest from './dtos/requests/product/UpdateProductRequest';
import paginate from './middlewares/paginate';
import InsertOrderRequest from './dtos/requests/order/InsertOrderRequest';
import InsertUserRequest from './dtos/requests/user/InsertUserRequest';

export function AppRoute(app) {
    //User
    router.post('/users',
        validate(InsertUserRequest),
        asyncHandler(UserController.addUser));
    // Product
    router.get('/products',
        paginate(5),
        asyncHandler(ProductController.getProduct));
    router.get('/products/:id',
        paginate(1),
        asyncHandler(ProductController.getProductById));
    router.post('/products',
        validate(InsertProductRequest),
        asyncHandler(ProductController.addProduct));
    router.delete('/products/:id', asyncHandler(ProductController.deleteProductById));
    router.put('/products/:id', 
        validate(UpdateProductRequest),
        asyncHandler(ProductController.updateProductById));

    // Category
    router.get('/categories',
        paginate(5),
        asyncHandler(CategoryController.getCategory));
    router.get('/categories/:id',
        paginate(1),
        asyncHandler(CategoryController.getCategoryById));
    router.post('/categories', asyncHandler(CategoryController.addCategory));
    router.delete('/categories/:id', asyncHandler(CategoryController.deleteCategoryById));
    router.put('/categories/:id', asyncHandler(CategoryController.updateCategoryById));

    // Brand
    router.get('/brands',
        paginate(5),
        asyncHandler(BrandController.getBrand));
    router.get('/brands/:id',
        paginate(1),
        asyncHandler(BrandController.getBrandById));
    router.post('/brands', asyncHandler(BrandController.addBrand));
    router.delete('/brands/:id', asyncHandler(BrandController.deleteBrandById));
    router.put('/brands/:id', asyncHandler(BrandController.updateBrandById));

    // Order
    router.get('/orders', asyncHandler(OrderController.getOrder));
    router.get('/orders/:id', asyncHandler(OrderController.getOrderById));
    router.post('/orders', 
        validate(InsertOrderRequest),
        asyncHandler(OrderController.addOrder));
    router.delete('/orders/:id', asyncHandler(OrderController.deleteOrderById));
    router.put('/orders/:id', asyncHandler(OrderController.updateOrderById));

    // Order Detail
    router.get('/order-details', asyncHandler(OrderDetailController.getOrderDetails));
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailsById));
    router.post('/order-details', asyncHandler(OrderDetailController.addOrderDetails));
    router.delete('/order-details/:id', asyncHandler(OrderDetailController.deleteOrderDetailsById));
    router.put('/order-details/:id', asyncHandler(OrderDetailController.updateOrderDetailsById));

    app.use('/api', router);
}