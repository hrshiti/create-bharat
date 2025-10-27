// Generate 6-digit OTP
// NOTE: Currently using default OTP for testing. Uncomment SMS service to enable real OTP.
const generateOTP = () => {
  // Using default OTP for testing. To enable real OTP, uncomment the line below and
  // configure SMS service in utils/smsService.js
  return '123456';

  // Uncomment below to generate random OTP when SMS service is enabled
  // return Math.floor(100000 + Math.random() * 900000).toString();
};

// Verify OTP expiration
const isOTPExpired = (createdAt, expiryMinutes = 10) => {
  const now = new Date();
  const expiryTime = new Date(createdAt);
  expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);

  return now > expiryTime;
};

module.exports = { generateOTP, isOTPExpired };

