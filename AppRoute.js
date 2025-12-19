import express from 'express';
const router = express.Router();

import * as ProductController from './controllers/ProductController';
import * as UserController from './controllers/UserController';
import * as CategoryController from './controllers/CategoryController';
import * as BrandController from './controllers/BrandController';
import * as OrderController from './controllers/OrderController';
import * as OrderDetailController from './controllers/OrderDetailController';
import * as NewsController from './controllers/NewsController'
import * as NewsDetailController from './controllers/NewsDetailController'
import * as BannerController from './controllers/BannerController'
import * as BannerDetailController from './controllers/BannerDetailController'
import * as UploadImageAppWriteController from "./controllers/ImageController"
import asyncHandler from './middlewares/asyncHandler';
import validate from './middlewares/validate';
import paginate from './middlewares/paginate';
import uploadMultiple from './middlewares/uploadImage'
import InsertProductRequest from './dtos/requests/product/InsertProductRequest';
import UpdateProductRequest from './dtos/requests/product/UpdateProductRequest';
import InsertOrderRequest from './dtos/requests/order/InsertOrderRequest';
import UpdateOrderRequest from './dtos/requests/order/UpdateOrderRequest';
import InsertUserRequest from './dtos/requests/user/InsertUserRequest';
import InsertNewsRequest from './dtos/requests/news/InsertNewsRequest';
import UpdateNewsRequest from './dtos/requests/news/UpdateNewsRequest';
import InsertNewsDetailRequest from './dtos/requests/news-detail/InsertNewsDetailRequest';
import InsertBannerRequest from './dtos/requests/banner/InsertBannerRequest';
import UpdateBannerRequest from './dtos/requests/banner/UpdateBannerRequest';
import InsertBannerDetailRequest from './dtos/requests/banner-detail/InsertBannerDetailRequest';

export function AppRoute(app) {
    // News
    router.get('/news',
        paginate(5),
        asyncHandler(NewsController.getNews));
    router.get('/news/:id',
        paginate(1),
        asyncHandler(NewsController.getNewsById));
    router.post('/news',
        validate(InsertNewsRequest),
        asyncHandler(NewsController.addNews));
    router.delete('/news/:id', asyncHandler(NewsController.deleteNewsById));
    router.put('/news/:id',
        validate(UpdateNewsRequest),
        asyncHandler(NewsController.updateNewsById));
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
    router.put('/orders/:id',
        validate(UpdateOrderRequest),
        asyncHandler(OrderController.updateOrderById));

    // Order Detail
    router.get('/order-details', asyncHandler(OrderDetailController.getOrderDetails));
    router.get('/order-details/:id', asyncHandler(OrderDetailController.getOrderDetailsById));
    router.post('/order-details', asyncHandler(OrderDetailController.addOrderDetails));
    router.delete('/order-details/:id', asyncHandler(OrderDetailController.deleteOrderDetailsById));
    router.put('/order-details/:id', asyncHandler(OrderDetailController.updateOrderDetailsById));

    // News Detail
    router.get('/news-details',
        paginate(5),
        asyncHandler(NewsDetailController.getNewsDetail));
    router.get('/news-details/:id', asyncHandler(NewsDetailController.getNewsDetailById));
    router.post('/news-details',
        validate(InsertNewsDetailRequest),
        asyncHandler(NewsDetailController.addNewsDetail));
    router.delete('/news-details/:id', asyncHandler(NewsDetailController.deleteNewsDetailById));
    router.put('/news-details/:id', asyncHandler(NewsDetailController.updateNewsDetailById));
    // Banner
router.get('/banner',
    paginate(5),
    asyncHandler(BannerController.getBanner));

router.get('/banner/:id',
    paginate(1),
    asyncHandler(BannerController.getBannerById));

router.post('/banner',
    validate(InsertBannerRequest),
    asyncHandler(BannerController.addBanner));

router.delete('/banner/:id',
    asyncHandler(BannerController.deleteBannerById));

router.put('/banner/:id',
    validate(UpdateBannerRequest),
    asyncHandler(BannerController.updateBannerById));

    // Banner Detail
router.get('/banner-details',
    paginate(5),
    asyncHandler(BannerDetailController.getBannerDetail));

router.get('/banner-details/:id',
    asyncHandler(BannerDetailController.getBannerDetailById));

router.post('/banner-details',
    validate(InsertBannerDetailRequest),
    asyncHandler(BannerDetailController.addBannerDetail));

router.delete('/banner-details/:id',
    asyncHandler(BannerDetailController.deleteBannerDetailById));

router.put('/banner-details/:id',
    asyncHandler(BannerDetailController.updateBannerDetailById));


///// upload ảnh
router.post("/upload/images",
  uploadMultiple.array("images", 5), // tối đa 5 ảnh
  asyncHandler(UploadImageAppWriteController.uploadMultipleImages)
);
/// delete ảnh
router.delete("/delete",
  asyncHandler(UploadImageAppWriteController.deleteImages)
);
    app.use('/api', router);
}