const axios = require('axios');

// Send OTP via SMSIndiaHub
const sendOTP = async (phone, otp) => {
  try {
    const apiKey = process.env.SMSINDIAHUB_API_KEY;
    const apiUrl = process.env.SMSINDIAHUB_API_URL || 'https://www.smsindiahub.in/api/mt/SendSMS';
    
    if (!apiKey) {
      console.error('SMSIndiaHub API Key not configured');
      return { success: false, error: 'SMS service not configured' };
    }

    const message = `Your OTP for Create Bharat login is ${otp}. Valid for 10 minutes. Do not share this OTP with anyone.`;
    
    // SMSIndiaHub API parameters
    const params = {
      user: process.env.SMSINDIAHUB_USERNAME || '',
      password: process.env.SMSINDIAHUB_PASSWORD || '',
      senderid: process.env.SMSINDIAHUB_SENDER_ID || 'CBRAT',
      channel: 'Trans',
      DCS: 0,
      flashsms: 0,
      number: phone,
      text: message,
      route: '1'
    };

    const response = await axios.get(apiUrl, { params });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('SMS sending error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendOTP };

