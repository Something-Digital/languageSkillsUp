const { DocAPIService } = require('yandex-cloud/lib/slydb/docapi/docapi');

const endpoint = 'https://docapi.serverless.yandexcloud.net/ru-central1/b1gd14lj4q35a4o6dunh/etn00ahdatdd84e89q7s';
const docApi = new DocAPIService(endpoint);

const params = {
  TableName: 'words',
  Key:
  {
    user_id: 'user1',
  }
};

module.exports.handler = async function ({ queryStringParameters }) {
  // queryStringParameters {}, multiValueQueryStringParameters {key: []}, body str, path str
  const res = {
    statusCode: 200,
    headers: {"content-type": "application/json"},
  };
  const { id, list_id } = queryStringParameters;
  if (id) {
    params.id = id;
    const result = await docApi.getItem(params);
    res.body = JSON.stringify(result);
  } else if (list_id) {

  } else {

  }
  return res;
};