import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '../../utils/api';
import OtpVerificationModal from './OtpVerificationModal';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup, selectedService, isAdminLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loginType, setLoginType] = useState('user'); // 'user', 'admin', or 'company'
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
        setIsLoading(true);

        try {
            // For user login - OTP based
            if (loginType === 'user') {
                if (!formData.phone) {
                    setIsLoading(false);
                    alert('Please enter your phone number');
                    return;
                }

                // Call API to send OTP
                const response = await authAPI.login({
                    phone: formData.phone,
                    role: 'user'
                });

                if (response.success) {
                    setOtpPhone(formData.phone);
                    setShowOtpModal(true);
                }
            }
            // For admin/company login - password based
            else {
                const response = await authAPI.login({
                    email: formData.email,
                    password: formData.password,
                    role: loginType
                });

                if (response.success) {
                    // Save user data
                    const userData = response.data;
                    localStorage.setItem('userData', JSON.stringify(userData));
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userType', userData.role);
                    localStorage.setItem('isAdmin', userData.role === 'admin' ? 'true' : 'false');
                    localStorage.setItem('token', userData.token);

                    onClose();

                    // Navigate based on role and service
                    if (loginType === 'admin') {
                        if (selectedService === '/loans') {
                            navigate('/admin/loans');
                        } else if (selectedService === '/legal') {
                            navigate('/admin/legal');
                        } else if (selectedService === '/training') {
                            navigate('/admin/training');
                        } else {
                            navigate('/admin/dashboard');
                        }
                    } else if (loginType === 'company' && selectedService === '/internships') {
                        navigate('/company/internships');
                    } else if (selectedService) {
                        navigate(selectedService);
                    } else {
                        navigate('/');
                    }
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.message || 'Login failed. Please try again.';

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
                            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {isAdminLogin ? 'Admin Sign In' : selectedService === '/internships' ? 'Internship Sign In' : 'Sign In'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Login Type Options */}
                            {(isAdminLogin || selectedService === '/internships' || selectedService === '/legal') && (
                                <div className="mb-6">
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                        <button
                                            type="button"
                                            onClick={() => setLoginType('user')}
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${loginType === 'user'
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            {selectedService === '/internships' ? 'Student Login' : 'User Login'}
                                        </button>
                                        {isAdminLogin && (
                                            <button
                                                type="button"
                                                onClick={() => setLoginType('admin')}
                                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${loginType === 'admin'
                                                    ? 'bg-white text-gray-900 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                            >
                                                Admin Login
                                            </button>
                                        )}
                                        {selectedService === '/internships' && (
                                            <button
                                                type="button"
                                                onClick={() => setLoginType('company')}
                                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${loginType === 'company'
                                                    ? 'bg-white text-gray-900 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                            >
                                                Company Login
                                            </button>
                                        )}
                                        {selectedService === '/legal' && (
                                            <button
                                                type="button"
                                                onClick={() => setLoginType('admin')}
                                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${loginType === 'admin'
                                                    ? 'bg-white text-gray-900 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                            >
                                                Admin Login
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        {loginType === 'admin' && selectedService === '/loans'
                                            ? 'Access government loan administration panel'
                                            : loginType === 'admin' && selectedService === '/legal'
                                                ? 'Manage legal services and applications'
                                                : loginType === 'company'
                                                    ? 'Post internships and manage applications'
                                                    : selectedService === '/internships'
                                                        ? 'Find and apply for internships'
                                                        : selectedService === '/legal'
                                                            ? 'Access legal services and support'
                                                            : 'Regular user access to services'
                                        }
                                    </p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* User Login - Phone Field */}
                                {loginType === 'user' ? (
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
                                ) : (
                                    <>
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

                                        {/* Password Field */}
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your password"
                                            />
                                        </div>

                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="remember"
                                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                                    Remember me
                                                </label>
                                            </div>
                                            <button type="button" className="text-sm text-orange-600 hover:text-orange-500">
                                                Forgot password?
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </motion.button>
                            </form>

                            {/* Sign Up Link */}
                            <div className="mt-4 text-center">
                                <p className="text-gray-600 text-sm">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={onSwitchToSignup}
                                        className="text-orange-600 hover:text-orange-500 font-medium"
                                    >
                                        Sign up
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
                purpose="login"
                onSuccess={handleOtpSuccess}
            />
        </>
    );
};

export default LoginModal;
