import { Github, Mail, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
    const { login, isLoading, isAuthenticated } = useAuth();
    const [loginError, setLoginError] = useState<string>('');
    const location = useLocation();

    // Redirect to intended page or home if already authenticated
    if (isAuthenticated) {
        const from = (location.state as any)?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    const handleSocialLogin = async (provider: string) => {
        try {
            setLoginError('');
            await login(provider);
        } catch (error) {
            setLoginError('Login failed. Please try again.');
        }
    };

    const socialProviders = [
        {
            id: 'google',
            name: 'Google',
            icon: Mail,
            bgColor: 'bg-red-500 hover:bg-red-600',
            textColor: 'text-white',
        },
        {
            id: 'github',
            name: 'GitHub',
            icon: Github,
            bgColor: 'bg-gray-800 hover:bg-gray-900',
            textColor: 'text-white',
        },
        {
            id: 'discord',
            name: 'Discord',
            icon: MessageCircle,
            bgColor: 'bg-indigo-600 hover:bg-indigo-700',
            textColor: 'text-white',
        },
    ];

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8'>
                <div>
                    <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600'>
                        <span className='text-2xl font-bold text-white'>⌨</span>
                    </div>
                    <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                        Sign in to Typeon
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Continue your typing journey and track your progress
                    </p>
                </div>

                <div className='mt-8 space-y-4'>
                    {loginError && (
                        <div className='rounded-md bg-red-50 p-4'>
                            <div className='text-sm text-red-700'>{loginError}</div>
                        </div>
                    )}

                    <div className='space-y-3'>
                        {socialProviders.map(provider => {
                            const IconComponent = provider.icon;
                            return (
                                <button
                                    key={provider.id}
                                    onClick={() => handleSocialLogin(provider.id)}
                                    disabled={isLoading}
                                    className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-3 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${provider.bgColor} ${provider.textColor} focus:ring-blue-500`}>
                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                        {isLoading ? (
                                            <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                                        ) : (
                                            <IconComponent className='h-5 w-5' aria-hidden='true' />
                                        )}
                                    </span>
                                    {isLoading ? 'Signing in...' : `Continue with ${provider.name}`}
                                </button>
                            );
                        })}
                    </div>

                    <div className='relative mt-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300' />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-gray-50 px-2 text-gray-500'>Or continue as guest</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.history.back()}
                        className='group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'>
                        Continue as Guest
                    </button>
                </div>

                <div className='mt-6'>
                    <div className='text-center text-xs text-gray-500'>
                        <p>
                            By signing in, you agree to our{' '}
                            <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>

                <div className='mt-8 rounded-lg bg-blue-50 p-4'>
                    <div className='text-sm text-blue-800'>
                        <h3 className='font-medium'>Why sign in?</h3>
                        <ul className='mt-2 list-disc space-y-1 pl-5'>
                            <li>Save your progress across devices</li>
                            <li>Track your typing statistics over time</li>
                            <li>Unlock personalized lessons</li>
                            <li>Compete with friends on leaderboards</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
