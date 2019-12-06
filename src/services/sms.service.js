'use strict'

const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'ap-southeast-2' });

const sendSMSMessage = async ({ message, sender, receiver }) => {

  var params = {
    Message: message,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Promotional'
      },
      'AWS.SNS.SMS.SenderID': {
        DataType: 'String',
        StringValue: sender
      },
    },
    PhoneNumber: receiver
  };

  sns.publish(params, (error, data) => {
    if (error)
      throw error
    return data
  })

}

module.exports = { sendSMSMessage }