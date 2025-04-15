import { Sequelize } from "sequelize"
import db from "../models"
import InsertProductRequests from "../dtos/requests/InsertProductRequests"
import e from "express"

export async function getProduct(req, res) {
    res.status(200).json({
        message: 'Get list product success'
    })
}
export async function updateProductById(req, res) {
    res.status(200).json({
        message: 'Update product success'
    })
}
export async function deleteProductById(req, res) {
    res.status(200).json({
        message: 'Delete product success'
    })
}
export async function getProductById(req, res) {
    res.status(200).json({
        message: 'Get product by id success'
    })
}
export async function addProduct(req, res) {
    const { error } = InsertProductRequests.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: 'fail when add new product',
            error: error.details
        });
    }
        const product = await db.Product.create(req.body)
        return res.status(201).json({
            message: 'Add product success',
            data: product
        })
}