'use strict'

const { Activity, Category, Sequelize: { Op } } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getCategory = async (id) => {
  const where = {
    where: { id },
    include: [{
      model: Category,
      as: "children",
      order: [['order']]
    }]
  }
  try {
    const data = await Category.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const getCategories = async (pageIndex, pageSize) => {
  const order = [['order']];
  try {
    const data = await Category.findAndCountAll({ ...paginate(pageIndex, pageSize), order })
    return data
  } catch (error) {
    throw error
  }
}

const getCategoriesActivities = async (ids, pageIndex, pageSize) => {
  const where = {
    ...paginate(pageIndex, pageSize),
    where: { categoryId: { [Op.in]: [ids] } },
  };

  try {
    const data = await Activity.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const getRootCategories = async () => {
  const order = [['order']];
  const where = { where: { parentId: null }, order };
  try {
    const data = await Category.findAndCountAll(where)
    return data
  } catch (error) {
    throw error
  }
}

const postCategory = async (value) => {
  try {
    const data = await Category.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putCategory = async (id, value) => {
  const where = {
    where: { id }
  }
  try {
    const data = await Category.findOne(where);
    if (!data) throw new Error(`Category ${id} not found.`);
    await Category.update(value, where)
    return Object.assign(data, value)
  } catch (error) {
    throw error
  }
}

const deleteCategory = async (id) => {
  const where = {
    where: { id }
  }
  try {
    const data = await Category.findOne(where);
    if (!data) throw new Error(`Category ${id} not found.`);
    await Category.destroy(where)
    return Object.assign(data)
  } catch (error) {
    throw error
  }
}

module.exports = { getCategory, getCategories, getCategoriesActivities, getRootCategories, postCategory, putCategory, deleteCategory }