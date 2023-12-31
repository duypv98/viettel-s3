const { successResponse } = require("../common/responses");
const { BadRequestError } = require("../common/errors");
const { vtS3, vtS3Bucket, vtEndpoint } = require("../services/s3.service");

module.exports = {
  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  async vtUploadSingle(req, res) {
    const file = req.file;
    if (!file) {
      throw new BadRequestError({ data: 'No Such File!' });
    }
    const baseFolder = req.query.base_folder;
    const bucket = req.query.bucket;
    if (!bucket) throw new BadRequestError({ data: 'No Such Bucket' });
    const time = new Date();
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const Key = `${baseFolder ? `${baseFolder}/` : ''}${y}/${m}/${d}/${file.originalname}`;
    const data = await vtS3.putObject({
      Bucket: bucket,
      Body: file.buffer,
      ServerSideEncryption: "AES256",
      Key,
      ContentType: file.mimetype,
      ACL: "public-read",
      // Tagging: `bucket=${bucket}`,
      // Metadata: {
      //   'bucket': bucket,
      //   'path': Key
      // }
    }).promise()
    return successResponse(res, {
      VersionId: data.VersionId,
      url: `${vtEndpoint}/${Key}`
    });
  }
}