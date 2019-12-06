const activityService = require('../../services/activity.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = (event, context, callback) => {
  const { id } = event.pathParameters
  context.callbackWaitsForEmptyEventLoop = false
  activityService
    .getActivity(id)
    .then((data) => callback(null, success(data)))
    .catch((err) => callback(null, failure(err)))
}