import { Sequelize } from "sequelize"
import db from "../models"

export async function getProduct(req, res ){
    res.status(200).json({
        message: 'Get list product success'
    })
}
export async function updateProductById(req, res ){
    res.status(200).json({
        message: 'Update product success'
    })
}
export async function deleteProductById(req, res ){
    res.status(200).json({
        message: 'Delete product success'
    })
}
export async function getProductById(req, res ){
    res.status(200).json({
        message: 'Get product by id success'
    })
}
export async function addProduct(req, res ){
   try {
    const product = await db.Product.create(req.body)
    res.status(201).json({
        message: 'Add product success',
        data: product
    })
} catch(error) {
    res.status(500).json({
        message: 'Add product failed',
        error: error.message
    })
    }
   
}