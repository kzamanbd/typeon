import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ProgressProvider } from './contexts/ProgressContext';
import { HomePage } from './pages/HomePage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { LessonsPage } from './pages/LessonsPage';
import { PracticePage } from './pages/PracticePage';

function App() {
    return (
        <ProgressProvider>
            <Router>
                <div className='min-h-screen bg-gray-50'>
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/lessons' element={<LessonsPage />} />
                        <Route path='/lesson/:lessonId' element={<LessonDetailPage />} />
                        <Route path='/practice' element={<PracticePage />} />
                        <Route
                            path='/stats'
                            element={
                                <div className='p-8 text-center'>
                                    <h1 className='text-2xl font-bold'>Statistics Page - Coming Soon</h1>
                                </div>
                            }
                        />
                        <Route
                            path='/settings'
                            element={
                                <div className='p-8 text-center'>
                                    <h1 className='text-2xl font-bold'>Settings Page - Coming Soon</h1>
                                </div>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </ProgressProvider>
    );
}

export default App;
