import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

// Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const MentorCategoryPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login
  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    
    if (type === 'admin') {
      // Redirect to admin dashboard
      navigate('/mentors/dashboard');
    } else if (type === 'mentor') {
      // Redirect to mentor profile
      navigate('/mentors/profile');
    }
    // For 'user', stay on the same page to browse mentors
  };

  // Handle logout
  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };

  // Handle admin redirect
  useEffect(() => {
    if (isLoggedIn && userType === 'admin') {
      const timer = setTimeout(() => {
        navigate('/mentors/dashboard', { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
  }
  }, [isLoggedIn, userType, navigate]);

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
              <span className="text-4xl">👥</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Mentorship</h2>
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
                            onClick={() => handleLogin('mentor')}
                            className="w-full p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                            <span className="text-2xl">🎓</span>
                            <span>Login as Mentor</span>
                        </motion.button>
                    </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our terms of service
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  // Render admin redirect loading
  const renderAdminRedirect = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👨‍💼</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Redirecting to Admin Panel</h2>
          <p className="text-gray-600 mb-4">Please wait while we redirect you...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return renderLoginPage();
  }

  // Show admin redirect if admin
  if (userType === 'admin') {
    return renderAdminRedirect();
  }

  const categories = [
    {
      id: 'business',
      name: 'Business',
      icon: '💼',
      description: 'Get guidance on starting and scaling your business',
      color: 'from-blue-500 to-cyan-500',
      mentors: 25
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: '💻',
      description: 'Learn coding, software development, and tech skills',
      color: 'from-green-500 to-emerald-500',
      mentors: 18
    },
    {
      id: 'career',
      name: 'Career',
      icon: '🎯',
      description: 'Career planning, resume building, and job search strategies',
      color: 'from-purple-500 to-violet-500',
      mentors: 22
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: '💰',
      description: 'Personal finance, investment strategies, and wealth building',
      color: 'from-orange-500 to-red-500',
      mentors: 15
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: '📈',
      description: 'Digital marketing, branding, and sales strategies',
      color: 'from-pink-500 to-rose-500',
      mentors: 20
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: '🧠',
      description: 'Life coaching, productivity, and personal growth',
      color: 'from-indigo-500 to-blue-500',
      mentors: 16
    },
    {
      id: 'design',
      name: 'Design',
      icon: '🎨',
      description: 'UI/UX design, graphic design, and creative skills',
      color: 'from-pink-500 to-purple-500',
      mentors: 12
    },
    {
      id: 'data',
      name: 'Data Science',
      icon: '📊',
      description: 'Data analysis, machine learning, and analytics',
      color: 'from-blue-500 to-indigo-500',
      mentors: 14
    },
    {
      id: 'health',
      name: 'Health',
      icon: '🏥',
      description: 'Healthcare, wellness, and medical guidance',
      color: 'from-green-500 to-teal-500',
      mentors: 18
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

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
              <ArrowLeftIcon />
            </Link>
            <h1 className="text-white text-lg font-medium">
              {userType === 'mentor' ? 'Mentor Dashboard' : 'Mentorship Categories'}
            </h1>
            <div className="flex items-center space-x-2">
              {userType === 'mentor' && (
                <Link
                  to="/mentors/profile"
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Profile"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}
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
      <div className="bg-white rounded-t-3xl -mt-2 relative z-10 min-h-screen">
        <div className="p-4">
          {/* Categories Grid - 3 columns */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-3 gap-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={scaleIn}
              >
                <Link to={`/mentors/category/${category.id}`} className="group">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Category Icon */}
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 flex items-center justify-center text-2xl text-[#D4AF37]">
                        {category.icon}
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-sm font-medium text-gray-900 text-center leading-tight">
                      {category.name}
                    </h3>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            {userType === 'mentor' ? (
              <Link 
                to="/mentors/profile"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Manage My Profile
              </Link>
            ) : (
              <Link 
                to="/mentors/become-mentor"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Become a Mentor
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorCategoryPage;
