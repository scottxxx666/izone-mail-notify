const got = require("got");
const FormData = require("form-data");
const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-1",
});

const handler = async (event) => {
  console.log(JSON.stringify(event));
  const message = event.Records[0];
  await sendNotification(message.messageAttributes.OpenId.stringValue, message.body);
  return 'Success';
};

const sendNotification = function sendNotificationToSubscriber(token, message) {
  console.log(token, message);

  const form = new FormData();
  form.append("message", message);

  return got("https://notify-api.line.me/api/notify", {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
};

exports.handler = handler;
