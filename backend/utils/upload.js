const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

// Configure Multer with memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 10 // Maximum number of files
  },
  fileFilter: (req, file, cb) => {
    // Define allowed file types
    const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg/;
    const allowedVideoTypes = /mp4|mov|avi|wmv|flv|webm/;
    const allowedDocumentTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt/;

    const mimetype = file.mimetype;
    const extname = file.originalname.toLowerCase();

    // Check if file type is allowed
    const isImage = allowedImageTypes.test(extname) || mimetype.startsWith('image/');
    const isVideo = allowedVideoTypes.test(extname) || mimetype.startsWith('video/');
    const isDocument = allowedDocumentTypes.test(extname) || mimetype.includes('document') || mimetype.includes('spreadsheet') || mimetype.includes('presentation');

    if (isImage || isVideo || isDocument) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
    }
  }
});

// Upload to Cloudinary from buffer
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'createbharat',
      resource_type: 'auto',
      ...options
    };

    const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Delete from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Error deleting from Cloudinary: ${error.message}`);
  }
};

// Specific upload middlewares for different use cases
const uploadSingle = upload.single('file');
const uploadMultiple = upload.array('files', 10);
const uploadFields = upload.fields([
  { name: 'image', maxCount: 5 },
  { name: 'video', maxCount: 3 },
  { name: 'document', maxCount: 5 }
]);

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  uploadToCloudinary,
  deleteFromCloudinary
};
