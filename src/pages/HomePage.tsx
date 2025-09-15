import {
    ArrowRight,
    Award,
    BookOpen,
    Brain,
    CheckCircle,
    Globe,
    Keyboard,
    Shield,
    Star,
    Target,
    Timer,
    TrendingUp,
    Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TypingEffect: React.FC<{
    words: string[];
    className?: string;
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
}> = ({ words, className = '', speed = 150, deleteSpeed = 75, pauseTime = 2000 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    // Typing
                    if (currentText.length < currentWord.length) {
                        setCurrentText(currentWord.slice(0, currentText.length + 1));
                    } else {
                        // Pause before deleting
                        setTimeout(() => setIsDeleting(true), pauseTime);
                    }
                } else {
                    // Deleting
                    if (currentText.length > 0) {
                        setCurrentText(currentText.slice(0, -1));
                    } else {
                        setIsDeleting(false);
                        setCurrentWordIndex(prev => (prev + 1) % words.length);
                    }
                }
            },
            isDeleting ? deleteSpeed : speed,
        );

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, pauseTime]);

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span className={className}>
            {currentText}
            <span className={`inline-block w-1 ${showCursor ? 'bg-current' : 'bg-transparent'}`}>|</span>
        </span>
    );
};

export const HomePage: React.FC = () => {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast Learning',
            description: 'Accelerate your typing speed with our scientifically-designed practice methods',
            gradient: 'from-yellow-400 to-orange-500',
        },
        {
            icon: Brain,
            title: 'Smart Analytics',
            description: 'AI-powered insights track your progress and identify areas for improvement',
            gradient: 'from-purple-400 to-pink-500',
        },
        {
            icon: Globe,
            title: 'Multi-Language Support',
            description: 'Master typing in English and Bengali with native language support',
            gradient: 'from-green-400 to-blue-500',
        },
        {
            icon: Award,
            title: 'Achievement System',
            description: 'Unlock badges and milestones as you progress through your typing journey',
            gradient: 'from-blue-400 to-indigo-500',
        },
        {
            icon: Timer,
            title: 'Real-Time Feedback',
            description: 'Get instant feedback on your typing speed, accuracy, and error patterns',
            gradient: 'from-red-400 to-pink-500',
        },
        {
            icon: Shield,
            title: 'Progress Protection',
            description: 'Your data is safely stored locally with export/import capabilities',
            gradient: 'from-teal-400 to-cyan-500',
        },
    ];

    const stats = [
        { value: '50+', label: 'Practice Lessons', icon: BookOpen },
        { value: '10K+', label: 'Words Database', icon: Keyboard },
        { value: '99%', label: 'Accuracy Goal', icon: Target },
        { value: '100+', label: 'WPM Potential', icon: TrendingUp },
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Software Developer',
            content: 'Increased my typing speed from 45 to 85 WPM in just 3 months!',
            rating: 5,
        },
        {
            name: 'Ahmed Rahman',
            role: 'Content Writer',
            content: 'The Bengali support helped me become fluent in typing both languages.',
            rating: 5,
        },
        {
            name: 'Emily Rodriguez',
            role: 'Student',
            content: 'Perfect for improving typing skills for my computer science studies.',
            rating: 5,
        },
    ];

    const benefits = [
        'Structured learning paths for all skill levels',
        'Real-time performance analytics',
        'Customizable typing environments',
        'Offline practice capabilities',
        'Export your progress data',
        'No subscription fees - completely free',
    ];

    const typingWords = ['Lightning Speed', 'Perfect Accuracy', 'Professional Skills', 'Career Success'];

    return (
        <div className='min-h-screen bg-white'>
            {/* Hero Section */}
            <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10'></div>

                {/* Floating Elements */}
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl'></div>
                    <div className='absolute -top-20 -right-20 h-60 w-60 rounded-full bg-purple-300/20 blur-3xl'></div>
                    <div className='absolute -bottom-10 left-1/2 h-50 w-50 rounded-full bg-indigo-300/20 blur-3xl'></div>
                </div>

                <div className='relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        {/* Main Headline with Typing Effect */}
                        <div className='mb-6'>
                            <h1 className='text-4xl font-bold text-gray-900 sm:text-6xl lg:text-7xl'>
                                Master Typing at
                            </h1>
                            <div className='mt-2 min-h-[1.2em] text-4xl font-bold sm:text-6xl lg:text-7xl'>
                                <TypingEffect
                                    words={typingWords}
                                    className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                                    speed={100}
                                    deleteSpeed={50}
                                    pauseTime={1500}
                                />
                            </div>
                        </div>

                        {/* Typing Demo Box */}
                        <div className='mx-auto mb-8 max-w-2xl rounded-xl border border-gray-200 bg-white/80 p-6 shadow backdrop-blur-sm'>
                            <div className='mb-4 text-sm font-medium text-gray-600'>Try typing this:</div>
                            <div className='font-mono text-lg leading-relaxed text-gray-800'>
                                <span className='text-green-600'>The quick brown fox</span>
                                <span className='bg-blue-200 text-blue-800'> jumps</span>
                                <span className='text-gray-400'> over the lazy dog</span>
                                <span className='animate-pulse bg-blue-500 text-white'>|</span>
                            </div>
                            <div className='mt-3 flex justify-between text-sm text-gray-500'>
                                <span>
                                    WPM: <span className='font-semibold text-blue-600'>45</span>
                                </span>
                                <span>
                                    Accuracy: <span className='font-semibold text-green-600'>94%</span>
                                </span>
                                <span>
                                    Time: <span className='font-semibold text-purple-600'>0:12</span>
                                </span>
                            </div>
                        </div>

                        <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-700 sm:text-2xl'>
                            Transform your typing skills with our comprehensive platform. Practice, learn, and excel
                            with real-time feedback and intelligent progress tracking.
                        </p>

                        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Link
                                to='/lessons'
                                className='group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
                                <Keyboard size={20} />
                                <span>Start Learning Now</span>
                                <ArrowRight className='transition-transform group-hover:translate-x-1' size={20} />
                            </Link>
                            <Link
                                to='/practice'
                                className='rounded-full border-2 border-blue-300 bg-white/60 px-8 py-4 font-semibold text-blue-700 backdrop-blur-sm transition-all duration-300 hover:bg-white/80'>
                                <span className='flex items-center gap-2'>
                                    <Timer size={20} />
                                    Try Practice Mode
                                </span>
                            </Link>
                        </div>

                        {/* Quick Start Stats */}
                        <div className='mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                            <div className='rounded-lg bg-white/50 p-4 backdrop-blur-sm'>
                                <div className='text-2xl font-bold text-blue-600'>10 min</div>
                                <div className='text-sm text-gray-600'>Average lesson time</div>
                            </div>
                            <div className='rounded-lg bg-white/50 p-4 backdrop-blur-sm'>
                                <div className='text-2xl font-bold text-purple-600'>2x faster</div>
                                <div className='text-sm text-gray-600'>Improvement rate</div>
                            </div>
                            <div className='rounded-lg bg-white/50 p-4 backdrop-blur-sm'>
                                <div className='text-2xl font-bold text-indigo-600'>100% free</div>
                                <div className='text-sm text-gray-600'>No hidden costs</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-white to-transparent'></div>
            </div>

            {/* Platform Stats */}
            <section className='py-16'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
                        {stats.map((stat, index) => (
                            <div key={index} className='text-center'>
                                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
                                    <stat.icon size={28} />
                                </div>
                                <div className='text-3xl font-bold text-gray-900'>{stat.value}</div>
                                <div className='text-gray-600'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='bg-gray-50 py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>Why Choose Typing Master?</h2>
                        <p className='mx-auto max-w-2xl text-xl text-gray-600'>
                            Experience the most advanced typing platform with features designed for rapid skill
                            development
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='group rounded-2xl bg-white p-8 shadow transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                                <div
                                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white`}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 className='mb-4 text-xl font-bold text-gray-900'>{feature.title}</h3>
                                <p className='text-gray-600'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className='py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
                        <div>
                            <h2 className='mb-6 text-4xl font-bold text-gray-900'>Everything You Need to Excel</h2>
                            <p className='mb-8 text-xl text-gray-600'>
                                Our comprehensive platform provides all the tools and features you need to master typing
                                efficiently.
                            </p>
                            <div className='space-y-4'>
                                {benefits.map((benefit, index) => (
                                    <div key={index} className='flex items-start gap-3'>
                                        <CheckCircle className='mt-1 h-5 w-5 text-green-500' />
                                        <span className='text-gray-700'>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white'>
                                <h3 className='mb-6 text-2xl font-bold'>Start Your Journey Today</h3>
                                <div className='space-y-4'>
                                    <Link
                                        to='/lessons'
                                        className='flex w-full items-center justify-between rounded-lg bg-white/20 p-4 backdrop-blur-sm transition-all hover:bg-white/30'>
                                        <span className='font-medium'>Structured Lessons</span>
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link
                                        to='/practice'
                                        className='flex w-full items-center justify-between rounded-lg bg-white/20 p-4 backdrop-blur-sm transition-all hover:bg-white/30'>
                                        <span className='font-medium'>Free Practice</span>
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link
                                        to='/stats'
                                        className='flex w-full items-center justify-between rounded-lg bg-white/20 p-4 backdrop-blur-sm transition-all hover:bg-white/30'>
                                        <span className='font-medium'>Track Progress</span>
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className='bg-gray-50 py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>Loved by Thousands of Users</h2>
                        <p className='mx-auto max-w-2xl text-xl text-gray-600'>
                            See what our community says about their typing transformation
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className='rounded-2xl bg-white p-8 shadow'>
                                <div className='mb-4 flex gap-1'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                                    ))}
                                </div>
                                <p className='mb-6 text-gray-600'>"{testimonial.content}"</p>
                                <div>
                                    <div className='font-semibold text-gray-900'>{testimonial.name}</div>
                                    <div className='text-gray-500'>{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='bg-gradient-to-r from-blue-600 to-purple-700 py-20'>
                <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
                    <h2 className='mb-6 text-4xl font-bold text-white'>Ready to Transform Your Typing Skills?</h2>
                    <p className='mb-8 text-xl text-blue-100'>
                        Join thousands of users who have already improved their typing speed and accuracy.
                    </p>
                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                        <Link
                            to='/lessons'
                            className='rounded-full bg-white px-8 py-4 font-bold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
                            Start Learning Free
                        </Link>
                        <Link
                            to='/practice'
                            className='rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20'>
                            Try Practice Mode
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
