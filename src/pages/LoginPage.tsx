import { Github } from 'lucide-react';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Google Icon Component (custom SVG)
const GoogleIcon = () => (
    <svg className='h-5 w-5' viewBox='0 0 24 24'>
        <path
            fill='#4285F4'
            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
        />
        <path
            fill='#34A853'
            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
        />
        <path
            fill='#FBBC05'
            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
        />
        <path
            fill='#EA4335'
            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
        />
    </svg>
);

export const LoginPage: React.FC = () => {
    const { login, isLoading, isAuthenticated } = useAuth();
    const [loginError, setLoginError] = useState<string>('');
    const location = useLocation();

    // Redirect to intended page or home if already authenticated
    if (isAuthenticated) {
        const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    const handleSocialLogin = async (provider: string) => {
        try {
            setLoginError('');
            await login(provider);
        } catch {
            setLoginError('Login failed. Please try again.');
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
            <div className='m-4 w-full max-w-md'>
                <div className='rounded-2xl bg-white p-8 shadow'>
                    {/* Header */}
                    <div className='text-center'>
                        <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600'>
                            <span className='text-2xl font-bold text-white'>⌨</span>
                        </div>
                        <h1 className='text-2xl font-bold text-gray-900'>Welcome to Typeon</h1>
                        <p className='mt-2 text-sm text-gray-600'>Sign in to start your typing journey</p>
                    </div>

                    {/* Error Message */}
                    {loginError && (
                        <div className='mt-6 rounded-lg bg-red-50 p-3'>
                            <div className='text-sm text-red-700'>{loginError}</div>
                        </div>
                    )}

                    {/* Login Buttons */}
                    <div className='mt-6 space-y-3'>
                        {/* Google Login */}
                        <button
                            onClick={() => handleSocialLogin('google')}
                            disabled={isLoading}
                            className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                            {isLoading ? (
                                <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
                            ) : (
                                <GoogleIcon />
                            )}
                            <span>Continue with Google</span>
                        </button>

                        {/* GitHub Login */}
                        <button
                            onClick={() => handleSocialLogin('github')}
                            disabled={isLoading}
                            className='flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                            {isLoading ? (
                                <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-white'></div>
                            ) : (
                                <Github className='h-5 w-5' />
                            )}
                            <span>Continue with GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className='relative my-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-200' />
                        </div>
                        <div className='relative flex justify-center text-xs'>
                            <span className='bg-white px-2 text-gray-500'>or</span>
                        </div>
                    </div>

                    {/* Guest Access */}
                    <button
                        onClick={() => window.history.back()}
                        className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 focus:outline-none'>
                        Continue as Guest
                    </button>

                    {/* Footer */}
                    <p className='mt-6 text-center text-xs text-gray-500'>
                        By signing in, you agree to our{' '}
                        <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                            Terms
                        </a>{' '}
                        and{' '}
                        <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
