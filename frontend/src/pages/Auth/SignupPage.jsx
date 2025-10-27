import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';

const SignupPage = () => {
    const [step, setStep] = useState('details'); // 'details' or 'otp'
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: ''
    });
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSendOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate sending OTP
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
            alert(`OTP sent to ${formData.phone}`);
        }, 2000);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            const userData = {
                name: formData.username,
                firstName: formData.username,
                lastName: '',
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                address: ''
            };
            
            login(userData);
            
            setIsLoading(false);
            navigate('/');
        }, 1000);
    };

    const handleBack = () => {
        setStep('details');
        setOtp('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center p-4 md:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm md:max-w-md"
            >
                {/* Signup Form */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">🚀</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {step === 'details' ? 'Create Account' : 'Verify OTP'}
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {step === 'details' ? 'Join us today' : 'Enter the 6-digit code sent to your phone'}
                        </p>
                    </div>

                    {/* Details Form */}
                    {step === 'details' ? (
                        <form onSubmit={handleSendOTP} className="space-y-5">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-base"
                                    placeholder="Enter your username"
                                />
                            </div>

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
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-base"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="flex items-center">
                                    <span className="px-3 py-3 bg-gray-100 border-2 border-r-0 border-gray-300 rounded-l-xl text-sm font-medium text-gray-700 whitespace-nowrap">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        maxLength="10"
                                        pattern="[0-9]{10}"
                                        className="flex-1 min-w-0 px-3 md:px-4 py-3 border-2 border-gray-300 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-base md:text-lg tracking-wider"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || formData.phone.length !== 10 || !formData.email || !formData.username}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending OTP...
                                    </span>
                                ) : (
                                    'Send OTP'
                                )}
                            </motion.button>
                        </form>
                    ) : (
                        /* OTP Verification Form */
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength="6"
                                    pattern="[0-9]{6}"
                                    className="w-full px-3 md:px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-xl md:text-2xl tracking-[0.3em] md:tracking-[0.5em] text-center font-semibold"
                                    placeholder="000000"
                                />
                                <p className="mt-2 text-xs text-gray-500 text-center">
                                    OTP sent to +91 {formData.phone}
                                </p>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || otp.length !== 6}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    'Verify & Create Account'
                                )}
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={handleBack}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                                ← Change Phone Number
                            </motion.button>
                        </form>
                    )}

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-orange-600 hover:text-orange-500 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
