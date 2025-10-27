import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';
import logo from '../../assets/logo.png';

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [isLoading, setIsLoading] = useState(false);
    const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSendOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
            alert(`OTP sent to your phone and email`);
        }, 2000);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            if (loginType === 'admin') {
                localStorage.setItem('userType', 'admin');
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
                navigate('/admin/dashboard');
            } else {
                const existingUser = localStorage.getItem('userData');
                
                if (existingUser) {
                    const userData = JSON.parse(existingUser);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userPhone', phone);
                    localStorage.setItem('userEmail', email);
                } else {
                    const userData = {
                        name: email.split('@')[0],
                        firstName: email.split('@')[0],
                        lastName: '',
                        email: email,
                        phone: phone,
                        address: ''
                    };
                    login(userData);
                }
                localStorage.setItem('userType', 'user');
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            }
            
            setIsLoading(false);
        }, 1000);
    };

    const handleOtpChange = (index, value) => {
        if (!value || /^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-50 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                {step === 'phone' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-100 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-full flex items-center justify-center">
                                    <img src={logo} alt="CreateBharat" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                            OTP Verification
                        </h1>
                        <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
                            Enter your email and phone number to send OTP
                        </p>

                        {/* Login Type Selection */}
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
                                    👤 User Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoginType('admin')}
                                    className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        loginType === 'admin'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    👨‍💼 Admin Login
                                </button>
                            </div>
                    </div>

                    {/* Form */}
                        <form onSubmit={handleSendOTP} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                                    placeholder="your@email.com"
                            />
                        </div>

                        <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                            </label>
                            <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                required
                                    maxLength="10"
                                    pattern="[0-9]{10}"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                                    placeholder="9876543210"
                            />
                        </div>

                        <motion.button
                            type="submit"
                                disabled={isLoading || phone.length !== 10 || !email}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                                {isLoading ? 'Sending OTP...' : 'Continue'}
                        </motion.button>
                    </form>

                        {/* Sign up Link */}
                    <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                                <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    </motion.div>
                ) : (
                    /* OTP Verification Form */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                            Verification Code
                        </h1>
                        <p className="text-gray-600 text-center mb-10 text-sm md:text-base">
                            We have sent the verification code to your email and phone number.
                        </p>

                        <form onSubmit={handleVerifyOTP} className="space-y-8">
                            <div className="flex justify-center gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-16 h-16 md:w-20 md:h-20 text-center text-2xl md:text-3xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                                        autoFocus={index === 0}
                                    />
                                ))}
                </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading || otp.some(d => !d)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Verifying...' : 'Confirm'}
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={() => {
                                    setStep('phone');
                                    setOtp(['', '', '', '']);
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                                ← Change Phone Number
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default LoginPage;
