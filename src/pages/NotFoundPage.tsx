import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
            <div className='w-full max-w-md text-center'>
                <div className='mb-8'>
                    <h1 className='mb-4 text-9xl font-bold text-indigo-600'>404</h1>
                    <h2 className='mb-2 text-2xl font-semibold text-gray-900'>Page Not Found</h2>
                    <p className='mb-8 text-gray-600'>
                        Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't
                        exist.
                    </p>
                </div>

                <div className='space-y-4'>
                    <Link
                        to='/'
                        className='inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700'>
                        <Home size={18} />
                        Go Home
                    </Link>

                    <div className='text-center'>
                        <button
                            onClick={() => window.history.back()}
                            className='inline-flex items-center gap-2 font-medium text-indigo-600 transition-colors duration-200 hover:text-indigo-700'>
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>

                <div className='mt-12 border-t border-gray-200 pt-8'>
                    <p className='text-sm text-gray-500'>
                        Need help? Try visiting our{' '}
                        <Link to='/lessons' className='text-indigo-600 underline hover:text-indigo-700'>
                            lessons page
                        </Link>{' '}
                        or{' '}
                        <Link to='/practice' className='text-indigo-600 underline hover:text-indigo-700'>
                            practice area
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
