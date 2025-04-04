export async function getBrands(req, res) {
    res.status(200).json({
        message: 'Get list brand success'
    });
}

export async function updateBrandById(req, res) {
    res.status(200).json({
        message: 'Update brand success'
    });
}

export async function deleteBrandById(req, res) {
    res.status(200).json({
        message: 'Delete brand success'
    });
}

export async function getBrandById(req, res) {
    res.status(200).json({
        message: 'Get brand by id success'
    });
}

export async function addBrand(req, res) {
    res.status(200).json({
        message: 'Add brand success'
    });
}
