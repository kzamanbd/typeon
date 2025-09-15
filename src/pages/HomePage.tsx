import { BarChart3, BookOpen, Clock, Play, Target, TrendingUp } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

export const HomePage: React.FC = () => {
    const { overallStats, userProgress } = useProgress();

    const features = [
        {
            icon: BookOpen,
            title: 'Structured Lessons',
            description: 'Learn typing with progressive lessons in English and Bengali',
            color: 'blue',
        },
        {
            icon: Play,
            title: 'Practice Modes',
            description: 'Practice with stories, random words, and timed tests',
            color: 'green',
        },
        {
            icon: BarChart3,
            title: 'Progress Tracking',
            description: 'Track your WPM, accuracy, and improvement over time',
            color: 'purple',
        },
    ];

    const quickStats = [
        {
            icon: TrendingUp,
            label: 'Average WPM',
            value: overallStats.averageWPM > 0 ? overallStats.averageWPM.toString() : '--',
            color: 'blue',
        },
        {
            icon: Target,
            label: 'Average Accuracy',
            value: overallStats.averageAccuracy > 0 ? `${overallStats.averageAccuracy}%` : '--',
            color: 'green',
        },
        {
            icon: Clock,
            label: 'Practice Sessions',
            value: overallStats.totalSessions > 0 ? overallStats.totalSessions.toString() : '0',
            color: 'orange',
        },
    ];

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
            <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
                {/* Hero Section */}
                <div className='mb-16 text-center'>
                    <h1 className='mb-6 text-5xl font-bold text-gray-900'>Master Your Typing Skills</h1>
                    <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-600'>
                        Improve your typing speed and accuracy with our comprehensive learning platform. Practice with
                        structured lessons, engaging stories, and real-time progress tracking.
                    </p>
                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                        <Link
                            to='/lessons'
                            className='rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700'>
                            Start Learning
                        </Link>
                        <Link
                            to='/practice'
                            className='rounded-lg border-2 border-blue-600 bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50'>
                            Practice Now
                        </Link>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-3'>
                    {quickStats.map((stat, index) => (
                        <div key={index} className='rounded-lg bg-white p-6 text-center shadow-md'>
                            <div
                                className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-${stat.color}-100 text-${stat.color}-600 mb-4`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className='mb-1 text-2xl font-bold text-gray-900'>{stat.value}</h3>
                            <p className='text-gray-600'>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-3'>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className='rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
                            <div
                                className={`inline-flex h-16 w-16 items-center justify-center rounded-full bg-${feature.color}-100 text-${feature.color}-600 mb-6`}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className='mb-4 text-xl font-semibold text-gray-900'>{feature.title}</h3>
                            <p className='leading-relaxed text-gray-600'>{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className='rounded-xl bg-white p-8 shadow-lg'>
                    <h2 className='mb-6 text-center text-2xl font-bold text-gray-900'>Quick Actions</h2>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        <Link
                            to='/lessons?lang=english&level=beginner'
                            className='flex flex-col items-center rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50'>
                            <span className='mb-2 text-2xl'>🇺🇸</span>
                            <span className='font-medium text-gray-800'>English Beginner</span>
                        </Link>
                        <Link
                            to='/lessons?lang=bengali&level=beginner'
                            className='flex flex-col items-center rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50'>
                            <span className='mb-2 text-2xl'>🇧🇩</span>
                            <span className='font-medium text-gray-800'>Bengali Beginner</span>
                        </Link>
                        <Link
                            to='/practice?mode=random'
                            className='flex flex-col items-center rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-green-400 hover:bg-green-50'>
                            <span className='mb-2 text-2xl'>🎯</span>
                            <span className='font-medium text-gray-800'>Random Words</span>
                        </Link>
                        <Link
                            to='/practice?mode=timed'
                            className='flex flex-col items-center rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-purple-400 hover:bg-purple-50'>
                            <span className='mb-2 text-2xl'>⏱️</span>
                            <span className='font-medium text-gray-800'>Timed Test</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
