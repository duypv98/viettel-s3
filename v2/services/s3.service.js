const dotenv = require("dotenv");
const { S3 } = require("aws-sdk");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") })

const vtEndpoint = process.env.VT_S3_ENDPOINT || '';
const vtS3AccessKeyId = process.env.VT_S3_ACCESS_KEY_ID || '';
const vtS3AccessKeySecret = process.env.VT_S3_ACCESS_KEY_SECRET || '';
const vtEndpointMatchData = vtEndpoint.match(/^(http(|s)):\/\/(.*)$/muiys) || [];
const scheme = vtEndpointMatchData[1];
const vtEndpointHost = vtEndpointMatchData[3];
const Bucket = vtEndpointHost.split('.')[0];
const Endpoint = vtEndpointHost.split('.').slice(1).join('.');

console.log({
  scheme,
  vtEndpointHost,
  Bucket
})

const vtS3 = new S3({
  endpoint: `${scheme}://${Endpoint}`,
  apiVersion: "2006-03-01",
  credentials: {
    accessKeyId: vtS3AccessKeyId,
    secretAccessKey: vtS3AccessKeySecret
  }
})

module.exports = {
  vtS3,
  vtS3Bucket: Bucket,
  vtEndpoint
}