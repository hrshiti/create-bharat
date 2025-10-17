import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNavbar from '../../components/common/BottomNavbar';

// Bottom Nav Icons
const HomeIcon = ({ active }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> );
const BriefcaseIcon = ({ active }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
const ChatIcon = ({ active }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> );
const DocumentIcon = ({ active }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> );
const UserIcon = ({ active }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );

const LegalConsultPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    urgency: 'medium'
  });

  const legalCategories = [
    { id: 'business', name: 'Business Law', icon: '🏢', description: 'Company registration, contracts, compliance' },
    { id: 'property', name: 'Property Law', icon: '🏠', description: 'Property registration, documentation, disputes' },
    { id: 'family', name: 'Family Law', icon: '👨‍👩‍👧‍👦', description: 'Marriage, divorce, inheritance matters' },
    { id: 'criminal', name: 'Criminal Law', icon: '⚖️', description: 'Legal defense, bail, court proceedings' },
    { id: 'tax', name: 'Tax Law', icon: '💰', description: 'Tax filing, compliance, disputes' },
    { id: 'employment', name: 'Employment Law', icon: '💼', description: 'Labor rights, contracts, disputes' }
  ];

  const lawyers = [
    {
      id: 1,
      name: 'Adv. Rajesh Kumar',
      specialization: 'Business Law',
      experience: '15+ years',
      rating: 4.8,
      consultationFee: '₹2,000',
      availability: 'Available Now',
      languages: ['Hindi', 'English'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Adv. Priya Sharma',
      specialization: 'Property Law',
      experience: '12+ years',
      rating: 4.9,
      consultationFee: '₹1,500',
      availability: 'Available Now',
      languages: ['Hindi', 'English', 'Punjabi'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Adv. Amit Singh',
      specialization: 'Criminal Law',
      experience: '18+ years',
      rating: 4.7,
      consultationFee: '₹2,500',
      availability: 'Available Now',
      languages: ['Hindi', 'English'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Adv. Neha Gupta',
      specialization: 'Family Law',
      experience: '10+ years',
      rating: 4.6,
      consultationFee: '₹1,800',
      availability: 'Available Now',
      languages: ['Hindi', 'English'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsultationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Consultation request submitted successfully!');
    setConsultationForm({
      name: '',
      email: '',
      phone: '',
      category: '',
      description: '',
      urgency: 'medium'
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 py-4 bg-white/90 backdrop-blur-lg border-b border-gradient-to-r from-blue-200 to-purple-200 shadow-lg"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.1, x: -2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 transition-all duration-300"
            onClick={() => navigate('/legal')}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Legal Consultation
          </motion.h1>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <div className="px-4 pb-20 pt-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Categories */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Legal Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {legalCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className={`text-sm font-semibold ${
                      selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Available Lawyers */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Lawyers</h2>
            <div className="space-y-4">
              {lawyers.map((lawyer) => (
                <motion.div
                  key={lawyer.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{lawyer.name}</h3>
                    <p className="text-sm text-gray-600">{lawyer.specialization} • {lawyer.experience}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 ml-1">{lawyer.rating}</span>
                      </div>
                      <span className="text-sm text-green-600 font-semibold">{lawyer.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-gray-500">Languages:</span>
                      <span className="text-sm text-gray-600">{lawyer.languages.join(', ')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{lawyer.consultationFee}</div>
                    <div className="text-xs text-gray-500">per consultation</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consultation Form */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Request Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={consultationForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={consultationForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={consultationForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legal Category *</label>
                  <select
                    name="category"
                    value={consultationForm.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {legalCategories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={consultationForm.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your legal issue..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                <select
                  name="urgency"
                  value={consultationForm.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low - Can wait a few days</option>
                  <option value="medium">Medium - Within 24 hours</option>
                  <option value="high">High - Immediate consultation needed</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Request
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar 
        tabs={[
          { name: 'Home', path: '/', icon: <HomeIcon /> },
          { name: 'Services', path: '/legal', icon: <BriefcaseIcon /> },
          { name: 'Consult', path: '/legal/consult', icon: <ChatIcon /> },
          { name: 'Documents', path: '/legal/documents', icon: <DocumentIcon /> },
          { name: 'Profile', path: '/profile', icon: <UserIcon /> }
        ]}
      />
    </div>
  );
};

export default LegalConsultPage;
