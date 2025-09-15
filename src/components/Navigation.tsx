import { BarChart3, BookOpen, Home, Play, Settings } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/lessons', label: 'Lessons', icon: BookOpen },
        { path: '/practice', label: 'Practice', icon: Play },
        { path: '/stats', label: 'Statistics', icon: BarChart3 },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className='border-b border-gray-200 bg-white shadow'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 justify-between'>
                    <div className='flex items-center'>
                        <Link to='/' className='flex items-center space-x-3'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600'>
                                <span className='text-lg font-bold text-white'>⌨</span>
                            </div>
                            <span className='text-xl font-bold text-gray-800'>Typing Master</span>
                        </Link>
                    </div>

                    <div className='flex items-center space-x-1'>
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors duration-200 ${
                                    isActive(path)
                                        ? 'bg-blue-100 font-medium text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                } `}>
                                <Icon size={20} />
                                <span className='hidden sm:block'>{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};
