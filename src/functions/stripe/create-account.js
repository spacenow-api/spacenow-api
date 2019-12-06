const stripeService = require('../../services/stripe.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const tos_acceptance = {
    "date": Math.floor(Date.now() / 1000),
    "ip": event.requestContext.identity.sourceIp
  }

  stripeService
    .createAccount({ ...JSON.parse(event.body), tos_acceptance })
    .then((data) => callback(null, success(data)))
    .catch((err) => callback(null, failure(err)))
}