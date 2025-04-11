import express from 'express';
const router = express.Router();

import * as ProductController from './controllers/ProductController';
import * as CategoryController from './controllers/CategoryController';
import * as BrandController from './controllers/BrandController';
import * as OrderController from './controllers/OrderController';
import * as OrderDetailController from './controllers/OrderDetailController';

export function AppRoute(app) {
    // Product
    router.get('/products', ProductController.getProduct);
    router.get('/products/:id', ProductController.getProductById);
    router.post('/products', ProductController.addProduct);
    router.delete('/products/:id', ProductController.deleteProductById);
    router.put('/products/:id', ProductController.updateProductById);
    
    // Category
    router.get('/categories', CategoryController.getCategory);
    router.get('/categories/:id', CategoryController.getCategoryById);
    router.post('/categories', CategoryController.addCategory);
    router.delete('/categories/:id', CategoryController.deleteCategoryById);
    router.put('/categories/:id', CategoryController.updateCategoryById);

    // Brand
    router.get('/brands', BrandController.getBrand);
    router.get('/brands/:id', BrandController.getBrandById);
    router.post('/brands', BrandController.addBrand);
    router.delete('/brands/:id', BrandController.deleteBrandById);
    router.put('/brands/:id', BrandController.updateBrandById);

    // Order
    router.get('/orders', OrderController.getOrder);
    router.get('/orders/:id', OrderController.getOrderById);
    router.post('/orders', OrderController.addOrder);
    router.delete('/orders/:id', OrderController.deleteOrderById);
    router.put('/orders/:id', OrderController.updateOrderById);

    // Order Detail
    router.get('/order-details', OrderDetailController.getOrderDetails);
    router.get('/order-details/:id', OrderDetailController.getOrderDetailsById);
    router.post('/order-details', OrderDetailController.addOrderDetails);
    router.delete('/order-details/:id', OrderDetailController.deleteOrderDetailsById);
    router.put('/order-details/:id', OrderDetailController.updateOrderDetailsById);

    app.use('/api/', router);
}
