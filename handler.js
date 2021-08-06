'use strict';

const AWS = require('aws-sdk');
var s3 = new AWS.S3({
  "s3ForcePathStyle": true,
  "accessKeyId": "S3RVER",
  "secretAccessKey": "S3RVER",
  "endpoint": "http://localhost:4569"
});

exports.handler = (event, context, callback) => {
  const element = {
    id: '12'
  };

  let params = {
    Bucket: 'local-bucket',
    Key: 'archivo.json',
    Body: JSON.stringify(element),
    ContentType: "application/json"
  }

  s3.putObject(params, function(err, data) {
    if(err) {
      return callback(null, response(409, {
        message: err.message
      }));
    }

    return callback(null, response(200, element));
  });
};

function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}