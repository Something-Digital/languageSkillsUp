const { DocAPIService } = require('yandex-cloud/lib/slydb/docapi/docapi');

module.exports.handler = async function (event, context) {
  const endpoint = 'https://docapi.serverless.yandexcloud.net/ru-central1/b1gd14lj4q35a4o6dunh/etn00ahdatdd84e89q7s';
  const docapi = new DocAPIService(endpoint);
  const params = {
    TableName: "words",
    Key:
    {
      "user_id": "user1",
      "id": "words1"
    }
  };
  const res = await docapi.getItem(params);
  console.log(res);
  return {
    statusCode: 200,
    headers: {"content-type": "application/json"},
    body: JSON.stringify(res),
  };
};