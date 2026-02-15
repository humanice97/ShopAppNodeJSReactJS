import db from "../models";
import { buildSearchQuery } from "../utils/buildSearchQuery";

// Lấy danh sách sản phẩm, có hỗ trợ tìm kiếm và phân trang
export async function getProduct(req, res) {
    const { search = '' } = req.query;
    const { page, pageSize, offset } = req.pagination;

    // Dùng thêm hàm helper để tái sử dụng đối với tìm kiếm bằng từ khóa
    const whereClause = buildSearchQuery(search, ['name', 'description', 'specification']);

    // Dùng promise để thực hiện 2 truy vấn song song để cải thiện hiệu suất
    const [products, totalProducts] = await Promise.all([
        db.Product.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Product.count({
            where: whereClause
        })
    ]);

    // Trả về lỗi 404 nếu không tìm thấy sản phẩm nào theo từ khóa đã search
    if (products.length === 0) {
        return res.status(404).json({
            message: `No products found for '${search}'`
        });
    }

    // Tính toán và gán thông tin phân trang vào req.pagination
    const totalPages = Math.ceil(totalProducts / pageSize);
    req.pagination.total = totalProducts;
    req.pagination.totalPages = totalPages;
    req.pagination.hasNextPages = page < totalPages;

    // Nếu tìm thấy sản phẩm thì trả về danh sách
    return res.status(200).json({
        message: 'Get list product success',
        data: products,
        pagination: req.pagination,
    });
}

// Cập nhật sản phẩm theo id 
export async function updateProductById(req, res) {
    const { id } = req.params;
    // Cập nhật sản phẩm theo id
    const updatedRows = await db.Product.update(req.body, {
      where: { id }
    });
  
    if (updatedRows[0] > 0) {
      return res.status(200).json({
        message: 'Update product success'
      });
    } else {
      return res.status(404).json({
        message: 'Product not found or no changes applied'
      });
    }
  }
  

// Xóa sản phẩm theo id
export async function deleteProductById(req, res) {
    const { id } = req.params;
    // Xóa sản phẩm theo id
    const deleted = await db.Product.destroy({
      where: { id }
    });
  
    if (deleted > 0) {
      return res.status(200).json({
        message: 'Delete product success'
      });
    } else {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
  }
  

// Lấy thông tin sản phẩm theo id
export async function getProductById(req, res) {
    const { id } = req.params;

    // Tìm sản phẩm theo khóa chính (primary key)
    const product = await db.Product.findByPk(id);

    // Nếu không tìm thấy sản phẩm
    if (!product) {
        return res.status(404).json({
            message: 'Not found a product'
        });
    }

    // Trả về dữ liệu sản phẩm nếu tìm thấy
    return res.status(200).json({
        message: 'Get product by id success',
        data: product
    });
}

// Thêm mới sản phẩm
export async function addProduct(req, res) {
  const { image, ...productData } = req.body;
        if (image && Array.isArray(image)) {
            image = JSON.stringify(image);
        }

        // 3. Tạo dữ liệu để lưu
        const newProductData = {
            ...productData,
            image: image // Gán lại image đã xử lý
        };
  
    // Tạo sản phẩm mới từ req.body
    const product = await db.Product.create(newProductData);

    // Trả về dữ liệu sản phẩm vừa thêm
    return res.status(201).json({
        message: 'Add product success',
        data: product
    });
}