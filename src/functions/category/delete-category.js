const categoryService = require('../../services/category.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  categoryService
    .deleteCategory(id)
    .then((data) => callback(null, success(data)))
    .catch((err) => callback(null, failure(err)))
}