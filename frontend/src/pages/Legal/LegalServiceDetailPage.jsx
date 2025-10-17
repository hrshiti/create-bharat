import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const LegalServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const legalServices = {
    1: {
      name: 'GST Registration',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      description: 'Register your business for Goods and Services Tax (GST) to comply with Indian tax regulations.',
      benefits: [
        'Legal compliance with tax regulations',
        'Ability to collect GST from customers',
        'Input tax credit benefits',
        'Enhanced business credibility'
      ],
      documents: [
        'PAN Card of the business/proprietor',
        'Aadhaar Card',
        'Business Address Proof',
        'Bank Account Details',
        'Digital Signature Certificate (DSC)',
        'Business Registration Certificate',
        'Partnership Deed (if applicable)',
        'Board Resolution (for companies)'
      ],
      process: [
        'Submit application with required documents',
        'Verification by tax authorities',
        'GST registration certificate issued',
        'GSTIN number provided'
      ],
      timeline: '7-15 business days',
      fees: '₹1,999'
    },
    2: {
      name: 'GST Filing',
      icon: '📄',
      color: 'from-green-500 to-emerald-500',
      description: 'File your GST returns accurately and on time to maintain compliance.',
      benefits: [
        'Maintain GST compliance',
        'Avoid penalties and interest',
        'Claim input tax credit',
        'Smooth business operations'
      ],
      documents: [
        'GST Registration Certificate',
        'Sales and Purchase Records',
        'Bank Statements',
        'Tax Invoices',
        'Credit/Debit Notes',
        'E-way Bills',
        'HSN/SAC Codes',
        'Previous GST Returns'
      ],
      process: [
        'Compile sales and purchase data',
        'Prepare GST returns',
        'File returns online',
        'Pay any tax due'
      ],
      timeline: 'Monthly/Quarterly',
      fees: '₹999 per return'
    },
    3: {
      name: 'Income Tax Filing',
      icon: '💰',
      color: 'from-purple-500 to-violet-500',
      description: 'File your income tax returns accurately to comply with tax obligations.',
      benefits: [
        'Tax compliance',
        'Avoid penalties',
        'Claim refunds',
        'Maintain financial records'
      ],
      documents: [
        'PAN Card',
        'Form 16/16A',
        'Bank Statements',
        'Investment Proofs',
        'Rent Receipts',
        'Medical Bills',
        'Insurance Premium Receipts',
        'Previous Year ITR'
      ],
      process: [
        'Gather all income documents',
        'Calculate taxable income',
        'File ITR online',
        'Pay any tax due'
      ],
      timeline: 'Before July 31st',
      fees: '₹1,499'
    },
    4: {
      name: 'ROC Filing',
      icon: '🏢',
      color: 'from-orange-500 to-red-500',
      description: 'File annual returns and compliance documents with Registrar of Companies.',
      benefits: [
        'Maintain company compliance',
        'Avoid penalties',
        'Good corporate governance',
        'Legal protection'
      ],
      documents: [
        'Annual Financial Statements',
        'Audit Report',
        'Board Resolution',
        'Director Report',
        'MGT-7 Form',
        'AOC-4 Form',
        'Company PAN Card',
        'Digital Signature Certificate'
      ],
      process: [
        'Prepare financial statements',
        'Conduct audit',
        'File annual returns',
        'Pay ROC fees'
      ],
      timeline: 'Within 60 days of AGM',
      fees: '₹2,999'
    },
    5: {
      name: 'Import Export Registration',
      icon: '🚢',
      color: 'from-indigo-500 to-blue-500',
      description: 'Register for import-export business to trade internationally.',
      benefits: [
        'Legal international trading',
        'Access to foreign markets',
        'Government incentives',
        'Business expansion opportunities'
      ],
      documents: [
        'PAN Card',
        'Aadhaar Card',
        'Business Registration',
        'Bank Certificate',
        'Address Proof',
        'Digital Signature Certificate',
        'Mobile Number',
        'Email ID'
      ],
      process: [
        'Submit IEC application',
        'Document verification',
        'IEC code generation',
        'Registration completion'
      ],
      timeline: '5-10 business days',
      fees: '₹1,999'
    },
    6: {
      name: 'MSME Registration',
      icon: '🏭',
      color: 'from-teal-500 to-green-500',
      description: 'Register your business as Micro, Small, or Medium Enterprise for government benefits.',
      benefits: [
        'Government subsidies',
        'Priority sector lending',
        'Tax benefits',
        'Procurement preferences'
      ],
      documents: [
        'PAN Card',
        'Aadhaar Card',
        'Business Registration',
        'Bank Account Details',
        'Business Address Proof',
        'Investment in Plant & Machinery',
        'Turnover Details',
        'Mobile Number'
      ],
      process: [
        'Submit Udyam registration',
        'Document verification',
        'MSME certificate issued',
        'Udyam number provided'
      ],
      timeline: '1-3 business days',
      fees: '₹999'
    },
    7: {
      name: 'Trade Mark Filing',
      icon: '™️',
      color: 'from-pink-500 to-rose-500',
      description: 'Protect your brand by registering your trademark.',
      benefits: [
        'Brand protection',
        'Exclusive rights',
        'Legal enforcement',
        'Brand value enhancement'
      ],
      documents: [
        'Trademark Application Form',
        'Logo/Brand Image',
        'Goods/Services Description',
        'Applicant Details',
        'Power of Attorney',
        'Priority Documents (if any)',
        'Mobile Number',
        'Email ID'
      ],
      process: [
        'Trademark search',
        'Application filing',
        'Examination',
        'Registration certificate'
      ],
      timeline: '6-12 months',
      fees: '₹4,999'
    },
    8: {
      name: 'Food (FSSAI) License',
      icon: '🍽️',
      color: 'from-yellow-500 to-orange-500',
      description: 'Obtain FSSAI license for food business operations.',
      benefits: [
        'Legal food business operation',
        'Consumer trust',
        'Quality compliance',
        'Business expansion'
      ],
      documents: [
        'PAN Card',
        'Aadhaar Card',
        'Business Registration',
        'Food Safety Plan',
        'Premises Documents',
        'Equipment List',
        'Mobile Number',
        'Email ID'
      ],
      process: [
        'Submit FSSAI application',
        'Document verification',
        'Inspection (if required)',
        'License issuance'
      ],
      timeline: '15-30 days',
      fees: '₹1,999'
    },
    9: {
      name: 'PF/ESIC Registration',
      icon: '👥',
      color: 'from-cyan-500 to-blue-500',
      description: 'Register for Provident Fund and Employee State Insurance.',
      benefits: [
        'Employee welfare compliance',
        'Social security benefits',
        'Legal compliance',
        'Employee retention'
      ],
      documents: [
        'PAN Card',
        'Business Registration',
        'Bank Account Details',
        'Employee Details',
        'Salary Structure',
        'Premises Documents',
        'Mobile Number',
        'Email ID'
      ],
      process: [
        'Submit registration application',
        'Document verification',
        'Registration numbers issued',
        'Compliance setup'
      ],
      timeline: '7-15 days',
      fees: '₹1,499'
    },
    10: {
      name: 'ISO Certification',
      icon: '🏆',
      color: 'from-emerald-500 to-teal-500',
      description: 'Obtain ISO certification to enhance business credibility.',
      benefits: [
        'Enhanced credibility',
        'Quality assurance',
        'Customer trust',
        'Competitive advantage'
      ],
      documents: [
        'Business Registration',
        'Quality Manual',
        'Process Documentation',
        'Management System Records',
        'Internal Audit Reports',
        'Corrective Action Records',
        'Training Records',
        'Mobile Number'
      ],
      process: [
        'Gap analysis',
        'Documentation preparation',
        'Internal audit',
        'Certification audit'
      ],
      timeline: '2-4 months',
      fees: '₹9,999'
    },
    11: {
      name: 'Proprietorship Company Registration',
      icon: '👤',
      color: 'from-violet-500 to-purple-500',
      description: 'Register your business as a proprietorship firm.',
      benefits: [
        'Simple business structure',
        'Easy compliance',
        'Full control',
        'Quick setup'
      ],
      documents: [
        'PAN Card',
        'Aadhaar Card',
        'Business Name',
        'Business Address',
        'Bank Account Details',
        'Mobile Number',
        'Email ID',
        'Business Activity Description'
      ],
      process: [
        'Choose business name',
        'Obtain licenses',
        'Open bank account',
        'Start operations'
      ],
      timeline: '1-7 days',
      fees: '₹999'
    },
    12: {
      name: 'Partnership Company Registration',
      icon: '🤝',
      color: 'from-red-500 to-pink-500',
      description: 'Register your business as a partnership firm.',
      benefits: [
        'Shared responsibility',
        'More resources',
        'Risk sharing',
        'Flexible structure'
      ],
      documents: [
        'Partnership Deed',
        'PAN Cards of Partners',
        'Aadhaar Cards',
        'Business Address Proof',
        'Bank Account Details',
        'Mobile Numbers',
        'Email IDs',
        'Business Activity Description'
      ],
      process: [
        'Draft partnership deed',
        'Register partnership',
        'Obtain PAN',
        'Open bank account'
      ],
      timeline: '3-7 days',
      fees: '₹1,999'
    },
    13: {
      name: 'Private Limited/LLP Company Registration',
      icon: '🏛️',
      color: 'from-blue-600 to-indigo-600',
      description: 'Register your business as Private Limited Company or LLP.',
      benefits: [
        'Limited liability',
        'Professional structure',
        'Easy funding',
        'Credibility'
      ],
      documents: [
        'Company Name',
        'Director/Partner Details',
        'Registered Office Address',
        'Memorandum of Association',
        'Articles of Association',
        'Digital Signature Certificates',
        'PAN Cards',
        'Address Proofs'
      ],
      process: [
        'Name approval',
        'Document preparation',
        'Application filing',
        'Certificate of incorporation'
      ],
      timeline: '7-15 days',
      fees: '₹4,999'
    },
    14: {
      name: 'NGO Registration',
      icon: '❤️',
      color: 'from-green-600 to-emerald-600',
      description: 'Register your organization as a Non-Governmental Organization.',
      benefits: [
        'Tax exemptions',
        'Government grants',
        'Legal recognition',
        'Social impact'
      ],
      documents: [
        'Trust Deed/Society Registration',
        'Founder Details',
        'Objectives Document',
        'Registered Office Address',
        'Bank Account Details',
        'PAN Card',
        'Mobile Number',
        'Email ID'
      ],
      process: [
        'Choose registration type',
        'Prepare documents',
        'Submit application',
        'Registration certificate'
      ],
      timeline: '15-30 days',
      fees: '₹2,999'
    }
  };

  const service = legalServices[parseInt(serviceId)];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/legal')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Legal Services
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/legal')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon />
          </motion.button>
          
          <Link to="/" className="flex items-center">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={logo} 
              alt="CreateBharat Logo" 
              className="h-12 w-auto object-contain" 
            />
          </Link>
          
          <div className="w-10"></div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="px-4 pt-6 pb-4 max-w-4xl mx-auto">
        {/* Service Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-4 shadow-lg`}
          >
            {service.icon}
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
          <p className="text-gray-600">{service.description}</p>
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* Benefits */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckIcon />
              Benefits
            </h2>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckIcon />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Process */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Process</h2>
            <div className="space-y-3">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Required Documents */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DocumentIcon />
              Required Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.documents.map((doc, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-700">
                  <DocumentIcon />
                  <span className="text-sm">{doc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeline & Fees */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h3>
                <p className="text-gray-600">{service.timeline}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Fee</h3>
                <p className="text-gray-600">{service.fees}</p>
              </div>
            </div>
          </motion.div>

          {/* Upload Documents Button */}
          <motion.div variants={fadeInUp} className="text-center">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/legal/service/${serviceId}/upload`)}
              className={`w-full bg-gradient-to-r ${service.color} text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Upload Documents
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalServiceDetailPage;
