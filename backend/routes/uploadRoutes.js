const express = require('express');
const router = express.Router();
const {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
  getUploadInfo
} = require('../controllers/uploadController');

router.get('/info', getUploadInfo);
router.post('/', uploadSingleFile);
router.post('/multiple', uploadMultipleFiles);
router.delete('/:publicId', deleteFile);

module.exports = router;

