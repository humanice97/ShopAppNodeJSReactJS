import express from 'express';
const router = express.Router();

import * as ProductController from './controllers/ProductController';
import * as CategoryController from './controllers/CategoryController';
import * as BrandController from './controllers/BrandController';
import * as OrderController from './controllers/OrderController';
import * as OrderDetailController from './controllers/OrderDetailController';

export function AppRoute(app) {
    // Product
    router.get('/products', ProductController.getProducts);
    router.get('/products/:id', ProductController.getProductsById);
    router.post('/products', ProductController.addProducts);
    router.delete('/products/:id', ProductController.deleteProductsById);
    router.put('/products/:id', ProductController.updateProductsById);
    
    // Category
    router.get('/categories', CategoryController.getCategories);
    router.get('/categories/:id', CategoryController.getCategoryById);
    router.post('/categories', CategoryController.addCategory);
    router.delete('/categories/:id', CategoryController.deleteCategoryById);
    router.put('/categories/:id', CategoryController.updateCategoryById);

    // Brand
    router.get('/brands', BrandController.getBrands);
    router.get('/brands/:id', BrandController.getBrandById);
    router.post('/brands', BrandController.addBrand);
    router.delete('/brands/:id', BrandController.deleteBrandById);
    router.put('/brands/:id', BrandController.updateBrandById);

    // Order
    router.get('/orders', OrderController.getOrders);
    router.get('/orders/:id', OrderController.getOrderById);
    router.post('/orders', OrderController.addOrder);
    router.delete('/orders/:id', OrderController.deleteOrderById);
    router.put('/orders/:id', OrderController.updateOrderById);

    // Order Detail
    router.get('/order-details', OrderDetailController.getOrderDetails);
    router.get('/order-details/:id', OrderDetailController.getOrderDetailById);
    router.post('/order-details', OrderDetailController.addOrderDetail);
    router.delete('/order-details/:id', OrderDetailController.deleteOrderDetailById);
    router.put('/order-details/:id', OrderDetailController.updateOrderDetailById);

    app.use('/api/', router);
}
