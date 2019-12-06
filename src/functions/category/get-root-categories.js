const categoryService = require('../../services/category.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  categoryService
    .getRootCategories()
    .then((data) => callback(null, success(data)))
    .catch((err) => callback(null, failure(err)))
}