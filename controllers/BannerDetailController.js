import db from "../models";

// Lấy danh sách banner detail (lọc theo banner_id hoặc product_id)
export async function getBannerDetail(req, res) {
       const { page, pageSize, offset } = req.pagination;
   
       const [details, total] = await Promise.all([
           db.BannerDetail.findAll({
               limit: pageSize,
               offset: offset,
               // include: [{ model: db.Banner }, { model: db.Product }]
           }),
           db.BannerDetail.count()
       ]);
   
       const totalPages = Math.ceil(total / pageSize);
       req.pagination.total = total;
       req.pagination.totalPages = totalPages;
       req.pagination.hasNextPages = page < totalPages;
   
       return res.status(200).json({
           message: 'Get list banner detail success',
           data: details,
           pagination: req.pagination,
       });
   }

// Lấy banner detail theo id
export async function getBannerDetailById(req, res) {
    const { id } = req.params;

    const bannerDetail = await db.BannerDetail.findByPk(id);

    if (!bannerDetail) {
        return res.status(404).json({
            message: 'Banner detail not found'
        });
    }

    return res.status(200).json({
        message: 'Get banner detail by id success',
        data: bannerDetail
    });
}

// Thêm mới banner detail
export async function addBannerDetail(req, res) {
    const { banner_id, product_id } = req.body;

    // (Optional) check tồn tại banner
    const banner = await db.Banner.findByPk(banner_id);
    if (!banner) {
        return res.status(404).json({
            message: 'Banner not found'
        });
    }

    // (Optional) check tồn tại product
    const product = await db.Product.findByPk(product_id);
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }

    const bannerDetail = await db.BannerDetail.create({
        banner_id,
        product_id
    });

    return res.status(201).json({
        message: 'Add banner detail success',
        data: bannerDetail
    });
}

// Cập nhật banner detail theo id
export async function updateBannerDetailById(req, res) {
    const { id } = req.params;
 const { product_id, banner_id } = req.body
      const existingDuplicate = await db.BannerDetail.findOne({
             where: {
                 product_id,
                 banner_id,
                 // Tìm xem có ai ngoài id đang sử dụng không
                 id: {[Sequelize.Op.ne]: id}
             }
         })
     
         if (existingDuplicate) {
            return res.status(409).json({
                 message: 'Relationship of product and banner has exists in another record'
             })
         }
    const [updatedRows] = await db.BannerDetail.update(req.body, {
        where: { id }
    });

    if (updatedRows > 0) {
        return res.status(200).json({
            message: 'Update banner detail success'
        });
    }

    return res.status(404).json({
        message: 'Banner detail not found or no changes applied'
    });
}

// Xóa banner detail theo id
export async function deleteBannerDetailById(req, res) {
    const { id } = req.params;

    const deleted = await db.BannerDetail.destroy({
        where: { id }
    });

    if (deleted) {
        return res.status(200).json({
            message: 'Delete banner detail success'
        });
    }

    return res.status(404).json({
        message: 'Banner detail not found'
    });
}
