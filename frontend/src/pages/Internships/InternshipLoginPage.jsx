import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const InternshipLoginPage = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handle login
    const handleLogin = (type) => {
        setUserType(type);
        setIsLoggedIn(true);
        
        if (type === 'company') {
            // Redirect to company dashboard
            localStorage.setItem('userType', 'company');
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/company/internships');
        }
        // For 'user', stay on the same page to browse internships
    };

    // Handle logout
    const handleLogout = () => {
        setUserType(null);
        setIsLoggedIn(false);
        localStorage.removeItem('userType');
        localStorage.setItem('isLoggedIn', 'false');
    };

    // Render login page
    const renderLoginPage = () => {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">💼</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Internships</h2>
                        <p className="text-gray-600">Choose how you'd like to access the platform</p>
                    </div>

                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleLogin('user')}
                            className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                            <span className="text-2xl">👤</span>
                            <span>Login as User</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleLogin('company')}
                            className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                            <span className="text-2xl">🏢</span>
                            <span>Login as Company</span>
                        </motion.button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            By continuing, you agree to our terms of service
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center justify-center">
                            <FaArrowLeft className="w-3 h-3 mr-1" />
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    };

    // Show login page if not logged in
    if (!isLoggedIn) {
        return renderLoginPage();
    }

    // If logged in as user, redirect to internships page
    if (isLoggedIn && userType === 'user') {
        navigate('/internships', { replace: true });
        return null;
    }

    // Show the internship content if user is logged in (for browsing)
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 sticky top-0 z-50"
            >
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-white">
                            <FaArrowLeft />
                        </Link>
                        <h1 className="text-white text-lg font-medium">
                            Browse Internships
                        </h1>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="p-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Browse Internships?</h2>
                    <p className="text-gray-600 mb-6">Explore opportunities from top companies</p>
                    <Link
                        to="/internships"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                    >
                        Browse All Internships
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default InternshipLoginPage;

