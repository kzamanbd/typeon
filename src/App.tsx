import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ProgressProvider } from './contexts/ProgressContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { HomePage } from './pages/HomePage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { LessonsPage } from './pages/LessonsPage';
import { PracticePage } from './pages/PracticePage';
import { SettingsPage } from './pages/SettingsPage';
import { StatisticsPage } from './pages/StatisticsPage';

function App() {
    return (
        <SettingsProvider>
            <ProgressProvider>
                <Router>
                    <div className='min-h-screen bg-gray-50'>
                        <Navigation />
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/lessons' element={<LessonsPage />} />
                            <Route path='/lesson/:lessonId' element={<LessonDetailPage />} />
                            <Route path='/practice' element={<PracticePage />} />
                            <Route path='/stats' element={<StatisticsPage />} />
                            <Route path='/settings' element={<SettingsPage />} />
                        </Routes>
                    </div>
                </Router>
            </ProgressProvider>
        </SettingsProvider>
    );
}

export default App;
