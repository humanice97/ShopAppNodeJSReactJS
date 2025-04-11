import { Sequelize } from "sequelize"
import db from "../models"

export async function getCategory(req, res) {
    res.status(200).json({
        message: 'Get list category success'
    });
}

export async function updateCategoryById(req, res) {
    res.status(200).json({
        message: 'Update category success'
    });
}

export async function deleteCategoryById(req, res) {
    res.status(200).json({
        message: 'Delete category success'
    });
}

export async function getCategoryById(req, res) {
    res.status(200).json({
        message: 'Get category by id success'
    });
}

export async function addCategory(req, res) {
    try {
      const category = await db.Category.create(req.body);
      res.status(201).json({
        message: 'Add category success',
        data: category
      });
    } catch (error) {
      res.status(500).json({
        message: 'Add category failed',
        error: error.message
      });
    }
  }
  
