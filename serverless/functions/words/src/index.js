const { DocAPIService } = require('yandex-cloud/lib/slydb/docapi/docapi');

const endpoint = 'https://docapi.serverless.yandexcloud.net/ru-central1/b1gd14lj4q35a4o6dunh/etn00ahdatdd84e89q7s';
const docApi = new DocAPIService(endpoint);

module.exports.handler = async function (event, context) {
  // event.payload = { a: b }
  // queryStringParameters {}, multiValueQueryStringParameters {key: []}, body str, path str
  const params = {
    TableName: "words",
    Key:
    {
      "user_id": "user1",
      "id": "words1"
    }
  };
  const res = await docApi.getItem(params);
  return {
    statusCode: 200,
    headers: {"content-type": "application/json"},
    body: JSON.stringify(event),
  };
};