import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LessonCard } from '../components/LessonCard';
import { useProgress } from '../contexts/ProgressContext';
import { allLessons } from '../data/lessons';
import { Language, Level } from '../types';

export const LessonsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isLessonCompleted, getLessonBestStats } = useProgress();

    const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>(
        (searchParams.get('lang') as Language) || 'all',
    );
    const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>((searchParams.get('level') as Level) || 'all');

    const filteredLessons = useMemo(() => {
        return allLessons
            .filter(lesson => {
                const languageMatch = selectedLanguage === 'all' || lesson.language === selectedLanguage;
                const levelMatch = selectedLevel === 'all' || lesson.level === selectedLevel;
                return languageMatch && levelMatch;
            })
            .sort((a, b) => a.order - b.order);
    }, [selectedLanguage, selectedLevel]);

    const handleLessonClick = (lessonId: string) => {
        navigate(`/lesson/${lessonId}`);
    };

    const languageOptions = [
        { value: 'all', label: 'All Languages', flag: '🌐' },
        { value: 'english', label: 'English', flag: '🇺🇸' },
        { value: 'bengali', label: 'Bengali', flag: '🇧🇩' },
    ];

    const levelOptions = [
        { value: 'all', label: 'All Levels' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
    ];

    const getLevelStats = (level: Level) => {
        const levelLessons = allLessons.filter(l => l.level === level);
        const completed = levelLessons.filter(l => isLessonCompleted(l.id)).length;
        return {
            total: levelLessons.length,
            completed,
        };
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='mb-2 text-3xl font-bold text-gray-900'>Typing Lessons</h1>
                    <p className='text-gray-600'>Master typing with structured lessons designed for all skill levels</p>
                </div>

                {/* Level Overview */}
                <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
                    {(['beginner', 'intermediate', 'advanced'] as Level[]).map(level => {
                        const stats = getLevelStats(level);
                        return (
                            <div key={level} className='rounded-lg bg-white p-6 shadow-md'>
                                <h3 className='mb-2 text-lg font-semibold text-gray-800 capitalize'>{level}</h3>
                                <div className='flex items-center justify-between'>
                                    <span className='text-gray-600'>
                                        {stats.completed} / {stats.total} lessons
                                    </span>
                                    <div className='h-2 w-24 rounded-full bg-gray-200'>
                                        <div
                                            className='h-2 rounded-full bg-blue-500'
                                            style={{
                                                width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='flex-1'>
                            <label className='mb-2 block text-sm font-medium text-gray-700'>Language</label>
                            <select
                                value={selectedLanguage}
                                onChange={e => setSelectedLanguage(e.target.value as Language | 'all')}
                                className='w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                                {languageOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.flag ? `${option.flag} ` : ''}
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex-1'>
                            <label className='mb-2 block text-sm font-medium text-gray-700'>Difficulty Level</label>
                            <select
                                value={selectedLevel}
                                onChange={e => setSelectedLevel(e.target.value as Level | 'all')}
                                className='w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                                {levelOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {filteredLessons.map(lesson => {
                        const completed = isLessonCompleted(lesson.id);
                        const bestStats = getLessonBestStats(lesson.id);

                        return (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onClick={() => handleLessonClick(lesson.id)}
                                isCompleted={completed}
                                bestStats={
                                    bestStats
                                        ? {
                                              wpm: bestStats.wpm,
                                              accuracy: bestStats.accuracy,
                                          }
                                        : undefined
                                }
                            />
                        );
                    })}
                </div>

                {filteredLessons.length === 0 && (
                    <div className='py-12 text-center'>
                        <div className='mb-4 text-gray-400'>
                            <svg className='mx-auto h-16 w-16' fill='currentColor' viewBox='0 0 20 20'>
                                <path
                                    fillRule='evenodd'
                                    d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </div>
                        <h3 className='mb-2 text-lg font-medium text-gray-900'>No lessons found</h3>
                        <p className='text-gray-600'>Try adjusting your filters to see more lessons.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
