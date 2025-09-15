import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { HomePage } from './pages/HomePage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { LessonsPage } from './pages/LessonsPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PracticePage } from './pages/PracticePage';
import { SettingsPage } from './pages/SettingsPage';
import { StatisticsPage } from './pages/StatisticsPage';

// Layout component that wraps all pages with navigation
function Layout() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navigation />
            <Outlet />
        </div>
    );
}

// Router configuration using React Router 7 patterns
const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'lessons',
                element: <LessonsPage />,
            },
            {
                path: 'lesson/:lessonId',
                element: <LessonDetailPage />,
            },
            {
                path: 'practice',
                element: <PracticePage />,
            },
            {
                path: 'stats',
                element: <StatisticsPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

function App() {
    return (
        <AuthProvider>
            <SettingsProvider>
                <ProgressProvider>
                    <RouterProvider router={router} />
                </ProgressProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}

export default App;
