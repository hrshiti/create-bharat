const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  otp: {
    type: String,
    required: [true, 'OTP is required']
  },
  purpose: {
    type: String,
    enum: ['login', 'register', 'verify'],
    default: 'login'
  },
  verified: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 10 minutes
  }
}, {
  timestamps: true
});

// Auto-delete expired documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Otp', otpSchema);

