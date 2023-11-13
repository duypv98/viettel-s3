const { Router } = require("express");
const { memStorageUpload } = require("../middlewares/upload");
const asyncHandler = require("../utils/asyncHandler");
const s3Controller = require("../controller/s3.controller");

const router = Router();

router.post("/upload", memStorageUpload.single("file"), asyncHandler(s3Controller.vtUploadSingle));

module.exports = router;