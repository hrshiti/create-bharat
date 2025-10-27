const { uploadSingle, uploadMultiple, uploadToCloudinary, deleteFromCloudinary } = require('../utils/upload');

// @desc    Upload single file
// @route   POST /api/upload
const uploadSingleFile = async (req, res) => {
  try {
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      try {
        // Upload to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, {
          public_id: req.file.fieldname + '-' + Date.now()
        });

        res.json({
          success: true,
          data: {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
            created_at: result.created_at
          }
        });
      } catch (uploadError) {
        res.status(500).json({
          success: false,
          error: uploadError.message
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
const uploadMultipleFiles = async (req, res) => {
  try {
    uploadMultiple(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err.message
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files uploaded'
        });
      }

      try {
        // Upload all files to Cloudinary
        const uploadPromises = req.files.map((file, index) => {
          return uploadToCloudinary(file.buffer, {
            public_id: file.fieldname + '-' + Date.now() + '-' + index
          });
        });

        const results = await Promise.all(uploadPromises);

        const uploads = results.map(result => ({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          resource_type: result.resource_type,
          bytes: result.bytes,
          created_at: result.created_at
        }));

        res.json({
          success: true,
          count: req.files.length,
          data: uploads
        });
      } catch (uploadError) {
        res.status(500).json({
          success: false,
          error: uploadError.message
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
const deleteFile = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        error: 'Public ID is required'
      });
    }

    const result = await deleteFromCloudinary(publicId);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get upload presets/info
// @route   GET /api/upload/info
const getUploadInfo = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        maxFileSize: '50MB',
        allowedTypes: {
          images: ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'],
          videos: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'],
          documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
        },
        maxFiles: 10
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
  getUploadInfo
};

