import React from 'react';
import { Link } from 'react-router-dom';
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
        className="bg-[#556B2F] sticky top-0 z-50"
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white">
              <ArrowLeftIcon />
            </Link>
            <h1 className="text-white text-lg font-medium">Category</h1>
            <div className="w-6 h-6">
              {/* Mountain icon placeholder */}
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22l-9-12z"/>
              </svg>
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
            <Link 
              to="/mentors/become-mentor"
              className="inline-flex items-center px-6 py-3 bg-[#556B2F] text-white font-medium rounded-lg hover:bg-[#4A5A2A] transition-colors"
            >
              Become a Mentor
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorCategoryPage;
