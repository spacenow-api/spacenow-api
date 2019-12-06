const categoryService = require('../../services/category.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {

  const paginate = { pageIndex: 0, pageSize: 10 };
  const { pageIndex, pageSize } = event.queryStringParameters || paginate;
  context.callbackWaitsForEmptyEventLoop = false
  categoryService
    .getCategories(pageIndex, pageSize)
    .then((data) => callback(null, success(data)))
    .catch((err) => callback(null, failure(err)))
}