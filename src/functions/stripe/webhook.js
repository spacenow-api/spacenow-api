const stripeService = require('../../services/stripe.service')
const smsService = require('../../services/sms.service')
const { success, failure } = require('../../helpers/response.utils')

module.exports.main = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let eventType;
  try {
    eventType = JSON.parse(event.body);
  } catch (err) {
    callback(null, failure(err))
  }
  switch (eventType.type) {
    case 'payment_intent.succeeded':
      console.log('Payment was done successful!')
      break;
    case 'payout.paid':
      console.log('Payout was done successful!')
      const data = eventType;
      const { individual: { phone } } = await stripeService.retrieveAccount(data.account)
      return await smsService.sendSMSMessage({ message: 'Congrats!!! Spacenow has paid you!', sender: "Spacenow", receiver: phone })
    default:
      callback(null, success('Default'))
  }

}