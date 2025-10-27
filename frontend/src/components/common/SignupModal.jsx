import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '../../utils/api';
import OtpVerificationModal from './OtpVerificationModal';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin, selectedService }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpPhone, setOtpPhone] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            // Call API to register and send OTP
            const response = await authAPI.register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: 'user'
            });

            if (response.success) {
                setOtpPhone(formData.phone);
                setShowOtpModal(true);
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.message || 'Registration failed. Please try again.';

            // Check if it's a backend connection error
            if (error.message && error.message.includes('backend')) {
                alert(`❌ Backend Server Not Running!\n\nPlease start the backend server:\n1. Open a new terminal\n2. cd backend\n3. npm start\n\nThe server should run on http://localhost:5000`);
            } else {
                alert(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSuccess = () => {
        setShowOtpModal(false);
        onClose();

        // Navigate based on service
        if (selectedService) {
            navigate(selectedService);
        } else {
            navigate('/');
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={handleOverlayClick}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your phone number"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        We'll send you an OTP to verify your number
                                    </p>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                        I agree to the Terms and Conditions
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </motion.button>
                            </form>

                            {/* Login Link */}
                            <div className="mt-4 text-center">
                                <p className="text-gray-600 text-sm">
                                    Already have an account?{' '}
                                    <button
                                        onClick={onSwitchToLogin}
                                        className="text-orange-600 hover:text-orange-500 font-medium"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* OTP Verification Modal */}
            <OtpVerificationModal
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                phone={otpPhone}
                purpose="register"
                onSuccess={handleOtpSuccess}
            />
        </>
    );
};

export default SignupModal;
