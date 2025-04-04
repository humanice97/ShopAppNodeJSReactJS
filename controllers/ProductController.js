export async function getProducts(req, res ){
    res.status(200).json({
        message: 'Get list product success'
    })
}
export async function updateProductsById(req, res ){
    res.status(200).json({
        message: 'Update product success'
    })
}
export async function deleteProductsById(req, res ){
    res.status(200).json({
        message: 'Delete product success'
    })
}
export async function getProductsById(req, res ){
    res.status(200).json({
        message: 'Get product by id success'
    })
}
export async function addProducts(req, res ){
    res.status(200).json({
        message: 'Add product success'
    })
}