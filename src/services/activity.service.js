'use strict'

const { Activity } = require('../../db/models')
const paginate = require('../helpers/paginate.utils')

const getActivities = async (pageIndex, pageSize) => {
  const order = [['order']];
  try {
    const data = await Activity.findAndCountAll({ ...paginate(pageIndex, pageSize), order })
    return data
  } catch (error) {
    throw error
  }
}

const getActivity = async (id) => {
  const where = {
    where: { id }
  }
  try {
    const data = await Activity.findOne(where);
    return data
  } catch (error) {
    throw error
  }
}

const postActivity = async (value) => {
  try {
    const data = await Activity.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const putActivity = async (id, value) => {
  const where = {
    where: { id }
  }
  try {
    const data = await Activity.findOne(where);
    if (!data) throw new Error(`Activity ${id} not found.`);
    await Activity.update(value, where)
    return Object.assign(data, value)
  } catch (error) {
    throw error
  }
}

const deleteActivity = async (id) => {
  try {
    const data = await Activity.findOne(where);
    if (!data) throw new Error(`Activity ${id} not found.`);
    await Activity.destroy(where)
    return Object.assign(data)
  } catch (error) {
    throw error
  }
}

module.exports = { getActivities, getActivity, postActivity, putActivity, deleteActivity }