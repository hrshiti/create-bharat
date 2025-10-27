import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const InternshipLoginPage = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('user');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
            alert(`OTP sent to ${phone}`);
        }, 2000);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            if (loginType === 'company') {
                localStorage.setItem('userType', 'company');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('companyName', 'Test Company');
                localStorage.setItem('companyPhone', phone);
                navigate('/company/internships');
            } else {
                localStorage.setItem('userType', 'user');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userPhone', phone);
                navigate('/internships');
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleBack = () => {
        setStep('phone');
        setOtp('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">💼</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {step === 'phone' ? 'Sign in to access internships' : 'Enter the 6-digit code'}
                        </p>
                    </div>

                    {/* Login Type Selection */}
                    {step === 'phone' && (
                        <div className="mb-6">
                            <div className="flex bg-gray-100 rounded-xl p-1">
                                <button
                                    type="button"
                                    onClick={() => setLoginType('user')}
                                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        loginType === 'user'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    👤 User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoginType('company')}
                                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        loginType === 'company'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    🏢 Company
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    {step === 'phone' ? (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="flex items-center">
                                    <span className="px-4 py-3 bg-gray-100 border-2 border-r-0 border-gray-300 rounded-l-xl text-sm font-medium text-gray-700">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        maxLength="10"
                                        pattern="[0-9]{10}"
                                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-lg tracking-wider"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || phone.length !== 10}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? 'Sending OTP...' : 'Send OTP'}
                            </motion.button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength="6"
                                    pattern="[0-9]{6}"
                                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-2xl tracking-[0.5em] text-center font-semibold"
                                    placeholder="000000"
                                />
                                <p className="mt-2 text-xs text-gray-500 text-center">
                                    OTP sent to +91 {phone}
                                </p>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || otp.length !== 6}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? 'Verifying...' : 'Verify & Login'}
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

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-gray-600 hover:text-orange-500 text-sm font-medium flex items-center justify-center">
                            <FaArrowLeft className="w-3 h-3 mr-1" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InternshipLoginPage;
