import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup, selectedService, isAdminLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loginType, setLoginType] = useState('user'); // 'user', 'admin', or 'company'
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onClose();
            
            // Set authentication state based on login type
            if (loginType === 'admin') {
                localStorage.setItem('userType', 'admin');
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('isLoggedIn', 'true');
            } else if (loginType === 'company') {
                localStorage.setItem('userType', 'company');
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                localStorage.setItem('userType', 'user');
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('isLoggedIn', 'true');
            }
            
            // Navigate to the selected service page after successful login
            if (selectedService) {
                if (loginType === 'admin' && selectedService === '/loans') {
                    // Navigate to admin dashboard for loans
                    navigate('/admin/loans');
                } else if (loginType === 'company' && selectedService === '/internships') {
                    // Navigate to company dashboard for internships
                    navigate('/company/internships');
                } else if (loginType === 'admin' && selectedService === '/legal') {
                    // Navigate to legal admin dashboard
                    navigate('/admin/legal');
                } else if (loginType === 'admin' && selectedService === '/training') {
                    // Navigate to training admin dashboard
                    navigate('/admin/training');
                } else if (loginType === 'admin') {
                    // Navigate to main admin dashboard
                    navigate('/admin/dashboard');
                } else {
                    navigate(selectedService);
                }
            }
        }, 1000);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
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
                                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                            loginType === 'user'
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
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                                loginType === 'admin'
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
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                                loginType === 'company'
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
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                                loginType === 'admin'
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
    );
};

export default LoginModal;
