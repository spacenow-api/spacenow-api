const stripeService = require('../../services/stripe.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const { id } = event.pathParameters
  stripeService
    .deleteSource(id)
    .then((data) => callback(null, success(data)))
    .catch((err) => callback(null, failure(err)))
}