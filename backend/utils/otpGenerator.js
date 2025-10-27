// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Verify OTP expiration
const isOTPExpired = (createdAt, expiryMinutes = 10) => {
  const now = new Date();
  const expiryTime = new Date(createdAt);
  expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);
  
  return now > expiryTime;
};

module.exports = { generateOTP, isOTPExpired };

