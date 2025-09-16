import { BarChart3, BookOpen, DollarSign, Home, LogIn, LogOut, Menu, Play, Settings, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
    path: string;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
    requiresAuth?: boolean;
}

export const Navigation: React.FC = () => {
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const allNavItems: NavItem[] = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/lessons', label: 'Lessons', icon: BookOpen },
        { path: '/practice', label: 'Practice', icon: Play },
        { path: '/stats', label: 'Statistics', icon: BarChart3 },
        { path: '/pricing', label: 'Pricing', icon: DollarSign },
        { path: '/settings', label: 'Settings', icon: Settings, requiresAuth: true },
    ];

    // Filter navigation items based on authentication status
    const navItems = allNavItems.filter(item => !item.requiresAuth || isAuthenticated);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        closeMobileMenu();
    }, [location.pathname]);

    return (
        <>
            <nav className='border-b border-gray-200 bg-white shadow-sm'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='flex h-16 justify-between'>
                        {/* Logo */}
                        <div className='flex items-center'>
                            <Link to='/' className='flex items-center space-x-3' onClick={closeMobileMenu}>
                                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600'>
                                    <span className='text-lg font-bold text-white'>⌨</span>
                                </div>
                                <span className='text-xl font-bold text-gray-800'>Typeon</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className='hidden md:flex md:items-center md:space-x-1'>
                            {navItems.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                        isActive(path)
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}>
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </Link>
                            ))}

                            {/* Desktop Authentication */}
                            <div className='ml-4 flex items-center space-x-2 border-l border-gray-200 pl-4'>
                                {isAuthenticated ? (
                                    <div className='flex items-center space-x-2'>
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.name} className='h-8 w-8 rounded-full' />
                                        ) : (
                                            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                                                <User size={16} className='text-blue-600' />
                                            </div>
                                        )}
                                        <span className='hidden text-sm font-medium text-gray-700 lg:block'>
                                            {user?.name}
                                        </span>
                                        <button
                                            onClick={logout}
                                            className='flex items-center space-x-1 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800'>
                                            <LogOut size={16} />
                                            <span className='hidden lg:block'>Sign Out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to='/login'
                                        className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                            isActive('/login')
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                        }`}>
                                        <LogIn size={18} />
                                        <span>Sign In</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button and auth */}
                        <div className='flex items-center space-x-2 md:hidden'>
                            {/* Mobile Auth - Show only user avatar or login icon */}
                            {isAuthenticated ? (
                                <div className='flex items-center space-x-2'>
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} className='h-8 w-8 rounded-full' />
                                    ) : (
                                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                                            <User size={16} className='text-blue-600' />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to='/login'
                                    className={`rounded-lg p-2 transition-colors duration-200 ${
                                        isActive('/login')
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                                    onClick={closeMobileMenu}>
                                    <LogIn size={20} />
                                </Link>
                            )}

                            {/* Hamburger menu button */}
                            <button
                                onClick={toggleMobileMenu}
                                className='rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                                aria-expanded={isMobileMenuOpen}
                                aria-label='Toggle menu'>
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
                    isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}>
                {/* Backdrop */}
                <div
                    className='fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300'
                    onClick={closeMobileMenu}
                />

                {/* Mobile menu panel */}
                <div
                    className={`fixed top-0 right-0 h-full w-80 max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-out ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className='flex h-16 items-center justify-between border-b border-gray-200 px-4'>
                        <div className='flex items-center space-x-3'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600'>
                                <span className='text-lg font-bold text-white'>⌨</span>
                            </div>
                            <span className='text-xl font-bold text-gray-800'>Typeon</span>
                        </div>
                        <button
                            onClick={closeMobileMenu}
                            className='rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                            <X size={24} />
                        </button>
                    </div>

                    <div className='px-4 py-6'>
                        {/* User info section for mobile */}
                        {isAuthenticated && (
                            <div className='mb-6 flex items-center space-x-3 rounded-lg bg-gray-50 p-4'>
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className='h-10 w-10 rounded-full' />
                                ) : (
                                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'>
                                        <User size={20} className='text-blue-600' />
                                    </div>
                                )}
                                <div>
                                    <p className='font-medium text-gray-900'>{user?.name || 'User'}</p>
                                    <p className='text-sm text-gray-500'>{user?.email || 'Signed in'}</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation items */}
                        <div className='space-y-2'>
                            {navItems.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={closeMobileMenu}
                                    className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-colors duration-200 ${
                                        isActive(path) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                                    }`}>
                                    <Icon size={20} />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile auth actions */}
                        <div className='mt-6 space-y-2 border-t border-gray-200 pt-6'>
                            {isAuthenticated ? (
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMobileMenu();
                                    }}
                                    className='flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium text-red-600 transition-colors duration-200 hover:bg-red-50'>
                                    <LogOut size={20} />
                                    <span>Sign Out</span>
                                </button>
                            ) : (
                                <Link
                                    to='/login'
                                    onClick={closeMobileMenu}
                                    className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-medium transition-colors duration-200 ${
                                        isActive('/login')
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}>
                                    <LogIn size={20} />
                                    <span>Sign In</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
