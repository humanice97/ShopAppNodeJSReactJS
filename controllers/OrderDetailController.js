import { Sequelize } from "sequelize"
import db from "../models"

export async function getOrderDetails(req, res) {
    res.status(200).json({
        message: 'Get list order detail success'
    });
}

export async function updateOrderDetailsById(req, res) {
    res.status(200).json({
        message: 'Update order detail success'
    });
}

export async function deleteOrderDetailsById(req, res) {
    res.status(200).json({
        message: 'Delete order detail success'
    });
}

export async function getOrderDetailsById(req, res) {
    res.status(200).json({
        message: 'Get order detail by id success'
    });
}

export async function addOrderDetails(req, res) {
    res.status(200).json({
        message: 'Add order detail success'
    });
}
