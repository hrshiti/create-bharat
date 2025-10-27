# SMS Service Implementation - Create Bharat

This document describes the SMS service implementation for Create Bharat backend, based on the RentYatra-main project.

## Overview

The SMS service implementation provides OTP-based authentication with multiple fallback mechanisms for reliability and development convenience.

## Architecture

### Services Structure

```
backend/
├── services/
│   ├── smsService.js          # Main SMSIndia Hub service
│   └── consoleSmsService.js   # Development fallback service
├── controllers/
│   └── userController.js      # Uses SMS services for OTP
└── .env                       # Environment configuration
```

### SMS Flow

1. **Primary Service**: SMSIndia Hub (Production-ready)
2. **Fallback Service**: Console SMS Service (Development)
3. **Auto-fallback**: If primary service fails, automatically switches to console

## Features

### 1. SMSIndia Hub Service (`services/smsService.js`)

- **Phone Normalization**: Automatically formats Indian phone numbers
- **API Integration**: Uses SMSIndia Hub API for sending SMS
- **Error Handling**: Comprehensive error handling with specific error messages
- **Timeout Protection**: 15-second timeout to prevent hanging requests
- **Configuration Check**: Validates API credentials before sending

#### Methods

- `sendOTP(phone, otp)` - Send OTP via SMS
- `normalizePhoneNumber(phone)` - Normalize phone number to 91XXXXXXXXXX format
- `isConfigured()` - Check if service is properly configured
- `testConnection()` - Test API connection
- `getBalance()` - Get SMS India Hub account balance

### 2. Console SMS Service (`services/consoleSmsService.js`)

- **Development Mode**: Logs OTP to console instead of sending SMS
- **Auto Fallback**: Automatically used when primary service fails
- **Phone Normalization**: Same phone number formatting as main service
- **No Dependencies**: No external API calls, always works

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```env
# SMS India Hub Configuration
SMSINDIAHUB_API_KEY=your_sms_india_hub_api_key
SMSINDIAHUB_SENDER_ID=your_sender_id
```

### Getting SMSIndia Hub Credentials

1. Sign up at [SMS India Hub](https://www.smsindiahub.in/)
2. Verify your account
3. Get your API Key and Sender ID from dashboard
4. Add them to `.env` file

**Note**: SMS template approval may be required for production use.

## Usage

### In Controllers

The SMS services are integrated into `userController.js` with automatic fallback:

```javascript
const smsService = require('../services/smsService');
const consoleSmsService = require('../services/consoleSmsService');

// Example usage with fallback
let smsResult;
try {
  smsResult = await smsService.sendOTP(phone, otp);
} catch (smsError) {
  // Automatically falls back to console SMS
  smsResult = await consoleSmsService.sendOTP(phone, otp);
}
```

### API Endpoints Using SMS

#### 1. Register User
```
POST /api/users/register
```

#### 2. Login User
```
POST /api/users/login
```

#### 3. Resend OTP
```
POST /api/users/resend-otp
```

All these endpoints send OTP via SMS with automatic fallback.

## Development vs Production

### Development Mode

When SMS India Hub is not configured or fails:
- OTP is logged to console
- Application continues to work
- No SMS sent, but OTP is available in console

### Production Mode

When SMS India Hub is configured:
- OTP is sent via actual SMS
- Real-time delivery
- Professional user experience

## Testing

### Test SMS Connection

```javascript
const smsService = require('./services/smsService');

// Test connection
const result = await smsService.testConnection();
console.log(result);
```

### Test with Console Fallback

Simply don't configure SMS India Hub credentials in `.env`, and OTPs will automatically be logged to console.

## Error Handling

The SMS service includes comprehensive error handling:

### Configuration Errors
- Missing API credentials
- Invalid sender ID
- Incorrect API URL

### Network Errors
- Connection timeout
- Network unreachable
- Connection reset

### API Errors
- Authentication failure
- Rate limiting
- Invalid phone number
- Server errors

All errors are logged and handled gracefully with automatic fallback.

## Integration with RentYatra

This implementation is based on RentYatra-main project's SMS service:

### Similarities
- Same SMS India Hub API integration
- Same phone number normalization logic
- Same fallback mechanism
- Similar error handling

### Differences
- Adapted for Create Bharat branding
- Simplified for Create Bharat's use case
- Focused on OTP delivery only

## Phone Number Format

The service automatically handles various phone number formats:

- `9876543210` → `919876543210`
- `09876543210` → `919876543210`
- `919876543210` → `919876543210`
- `+91 98765 43210` → `919876543210`

All formats are normalized to `91XXXXXXXXXX` format.

## API Response Format

### Successful Response
```json
{
  "success": true,
  "messageId": "sms_1234567890",
  "status": "sent",
  "to": "919876543210",
  "body": "Welcome to Create Bharat...",
  "provider": "SMSIndia Hub",
  "response": "..."
}
```

### Console Fallback Response
```json
{
  "success": true,
  "messageId": "console_1234567890",
  "status": "sent",
  "to": "919876543210",
  "body": "Your Create Bharat OTP is...",
  "provider": "Console SMS (Development)",
  "response": "OTP logged to console for development"
}
```

## Troubleshooting

### Issue: SMS not being sent

**Solution**: Check console logs for OTP in development mode. Configure SMS India Hub credentials for production.

### Issue: Invalid phone number error

**Solution**: Ensure phone number is a valid 10-digit Indian mobile number.

### Issue: Template approval pending

**Solution**: Contact SMS India Hub support to approve your SMS template for production use.

### Issue: Authentication failed

**Solution**: Verify your API key and sender ID in `.env` file.

## Dependencies

- `axios` - HTTP client for API requests
- `dotenv` - Environment variable management

## Future Enhancements

- Add more SMS providers (Twilio, TextLocal, etc.)
- Implement SMS delivery status tracking
- Add SMS template management
- Implement rate limiting
- Add SMS analytics

## Support

For issues or questions:
1. Check console logs for detailed error messages
2. Verify `.env` configuration
3. Test SMS India Hub connection
4. Contact SMS India Hub support for API issues

