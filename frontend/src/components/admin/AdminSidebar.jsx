import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FaHome, 
    FaMoneyBillWave, 
    FaGavel, 
    FaGraduationCap, 
    FaUsers, 
    FaChartBar, 
    FaCog,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';

const AdminSidebar = ({ isOpen, isMobile, onClose }) => {
    const location = useLocation();

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: FaHome,
            description: 'Overview & Analytics'
        },
        {
            name: 'Loans',
            path: '/admin/loans',
            icon: FaMoneyBillWave,
            description: 'Loan Management'
        },
        {
            name: 'Legal',
            path: '/admin/legal',
            icon: FaGavel,
            description: 'Legal Services'
        },
        {
            name: 'Training',
            path: '/admin/training',
            icon: FaGraduationCap,
            description: 'Content Management'
        },
        {
            name: 'Users',
            path: '/admin/users',
            icon: FaUsers,
            description: 'User Management'
        },
        {
            name: 'Analytics',
            path: '/admin/analytics',
            icon: FaChartBar,
            description: 'Reports & Insights'
        },
        {
            name: 'Settings',
            path: '/admin/settings',
            icon: FaCog,
            description: 'System Settings'
        }
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ 
                    x: isOpen ? 0 : (isMobile ? -256 : -256),
                    width: isOpen ? 256 : (isMobile ? 256 : 0)
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`fixed top-0 left-0 h-full bg-white shadow-xl border-r border-gray-200 z-50 ${
                    isMobile ? 'w-64' : 'w-64'
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <span className="text-white text-lg font-bold">A</span>
                        </div>
                        <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                            <p className="text-xs text-gray-500">CreateBharat</p>
                        </div>
                    </div>
                    
                    {/* Collapse button for desktop */}
                    {!isMobile && (
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        
                        return (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link
                                    to={item.path}
                                    onClick={isMobile ? onClose : undefined}
                                    className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        active
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                                    }`}
                                >
                                    <div className={`flex-shrink-0 ${
                                        active ? 'text-white' : 'text-gray-500 group-hover:text-orange-600'
                                    }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    
                                    <div className={`flex-1 min-w-0 transition-all duration-300 ${
                                        isOpen ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <div className="text-sm font-medium truncate">
                                            {item.name}
                                        </div>
                                        <div className={`text-xs truncate ${
                                            active ? 'text-orange-100' : 'text-gray-500'
                                        }`}>
                                            {item.description}
                                        </div>
                                    </div>
                                    
                                    {/* Active indicator */}
                                    {active && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="w-2 h-2 bg-white rounded-full"
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-medium">A</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                    Admin User
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    Super Admin
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            {isMobile && isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
};

export default AdminSidebar;
