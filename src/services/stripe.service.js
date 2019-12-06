'use strict'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
stripe.setApiVersion('2019-11-05');

const { Sequelize: { Op } } = require('../../db/models')

const createAccount = async (value) => {
  try {
    const data = await stripe.accounts.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const createCustomer = async (value) => {
  try {
    const data = await stripe.customers.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const retrieveAccount = async (id) => {
  try {
    const data = await stripe.accounts.retrieve(id)
    return data
  } catch (error) {
    throw error
  }
}

const retrieveCustomer = async (id) => {
  try {
    const data = await stripe.customers.retrieve(id)
    return data
  } catch (error) {
    throw error
  }
}

const retrieveBalance = async (id) => {
  try {
    const data = await stripe.balance.retrieve({ stripe_account: id })
    return data
  } catch (error) {
    throw error
  }
}

const createCustomerSource = async (id, value) => {
  try {
    const data = await stripe.customers.createSource(id, value)
    return data
  } catch (error) {
    throw error
  }
}

const createExternalAccount = async (id, value) => {
  try {
    const data = await stripe.accounts.createExternalAccount(id, value)
    return data
  } catch (error) {
    throw error
  }
}

const createToken = async (value) => {
  try {
    const data = await stripe.tokens.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const createCharge = async (value) => {
  try {
    const data = await stripe.charges.create(value)
    return data
  } catch (error) {
    throw error
  }
}

const deleteAccount = async (id) => {
  try {
    const data = await stripe.accounts.del(id)
    return data
  } catch (error) {
    throw error
  }
}

const retrieveTransfer = async (id) => {
  try {
    const data = await stripe.transfers.retrieve(id)
    return data
  } catch (error) {
    throw error
  }
}

const createPayout = async (id, value) => {
  try {
    const data = await stripe.payouts.create(value, { stripe_account: id })
    return data
  } catch (error) {
    throw error
  }
}

const reverseTransfer = async (id, value) => {
  try {
    const data = await stripe.transfers.createReversal(id, value)
    return data
  } catch (error) {
    throw error
  }
}

module.exports = { createAccount, retrieveAccount, createCustomer, retrieveCustomer, createCustomerSource, createToken, createCharge, deleteAccount, retrieveTransfer, createPayout, retrieveBalance, reverseTransfer }