import { Sequelize } from "sequelize"
import db from "../models"
export async function getBrand(req, res) {
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
    try {
      const brand = await db.Brand.create(req.body);
      res.status(201).json({
        message: 'Add brand success',
        data: brand
      });
    } catch (error) {
      res.status(500).json({
        message: 'Add brand failed',
        error: error.message
      });
    }
  }
  
