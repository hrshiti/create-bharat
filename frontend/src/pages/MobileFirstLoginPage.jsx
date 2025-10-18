import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.png';

const MobileFirstLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate login validation
        setTimeout(() => {
            if (loginType === 'admin') {
                // Admin login validation
                if (formData.email === 'admin@createbharat.com' && formData.password === 'admin123') {
                    localStorage.setItem('userType', 'admin');
                    localStorage.setItem('isAdmin', 'true');
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('adminEmail', formData.email);
                    localStorage.setItem('hasVisited', 'true');
                    
                    setIsLoading(false);
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    setError('Invalid admin credentials. Please try again.');
                    setIsLoading(false);
                }
            } else {
                // User login validation (simplified for demo)
                if (formData.email && formData.password) {
                    localStorage.setItem('userType', 'user');
                    localStorage.setItem('isAdmin', 'false');
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', formData.email);
                    localStorage.setItem('hasVisited', 'true');
                    
                    setIsLoading(false);
                    navigate('/', { replace: true });
                } else {
                    setError('Please enter valid credentials.');
                    setIsLoading(false);
                }
            }
        }, 1000);
    };

    const handleSkipLogin = () => {
        localStorage.setItem('hasVisited', 'true');
        localStorage.setItem('userType', 'guest');
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <img src={logo} alt="CreateBharat" className="w-10 h-10 object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to CreateBharat</h1>
                    <p className="text-gray-600 text-sm">Sign in to access all features</p>
                </div>

                {/* Login Type Selection */}
                <div className="mb-6">
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                            type="button"
                            onClick={() => setLoginType('user')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                loginType === 'user'
                                    ? 'bg-white text-orange-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            👤 User Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginType('admin')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                loginType === 'admin'
                                    ? 'bg-white text-orange-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            👨‍💼 Admin Login
                        </button>
                    </div>
                </div>

                {/* Demo Credentials */}
                {loginType === 'admin' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                        <h3 className="text-xs font-semibold text-blue-900 mb-1">Admin Demo:</h3>
                        <div className="text-xs text-blue-800">
                            <div><strong>Email:</strong> admin@createbharat.com</div>
                            <div><strong>Password:</strong> admin123</div>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 rounded-lg p-3"
                        >
                            <p className="text-red-800 text-sm">{error}</p>
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            `Sign In as ${loginType === 'admin' ? 'Admin' : 'User'}`
                        )}
                    </motion.button>
                </form>

                {/* Skip Login Option */}
                <div className="mt-4 text-center">
                    <button
                        onClick={handleSkipLogin}
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                        Continue as Guest
                    </button>
                </div>

                {/* Back Button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center justify-center mx-auto"
                    >
                        <FaArrowLeft className="w-3 h-3 mr-1" />
                        Back to Homepage
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MobileFirstLoginPage;
