const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true,
    sparse: true // Allow multiple null values but enforce uniqueness for non-null values
  },
  password: {
    type: String,
    required: false,
    select: false // Don't return password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'company', 'mentor'],
    default: 'user'
  },
  profile: {
    bio: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      instagram: String
    }
  },
  // Additional fields for Company role
  companyDetails: {
    companyName: String,
    companyType: {
      type: String,
      enum: ['startup', 'enterprise', 'ngo', 'other']
    },
    description: String,
    logo: String,
    address: String,
    establishedYear: Number
  },
  // Additional fields for Mentor role
  mentorDetails: {
    expertise: [{
      type: String
    }],
    experience: Number, // years of experience
    bio: String,
    availability: {
      type: String,
      enum: ['available', 'busy', 'not_available'],
      default: 'available'
    },
    hourlyRate: Number
  },
  // Additional fields for Admin role
  adminDetails: {
    permissions: [{
      type: String
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

