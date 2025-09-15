import { BarChart3, Calendar, Clock, Target, TrendingUp, Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonById } from '../data/lessons';
import type { TypingStats } from '../types';
import { loadPracticeHistory } from '../utils/localStorage';

interface StatCard {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    change?: string;
}

export const StatisticsPage: React.FC = () => {
    const { userProgress, overallStats } = useProgress();
    const [practiceHistory, setPracticeHistory] = useState<TypingStats[]>([]);
    const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'all'>('all');

    useEffect(() => {
        setPracticeHistory(loadPracticeHistory());
    }, []);

    const getFilteredHistory = () => {
        const now = new Date();
        const filtered = practiceHistory.filter(session => {
            if (timeFrame === 'all') return true;

            const sessionDate = new Date(session.timeElapsed * 1000); // Convert to date if needed
            const daysAgo = timeFrame === 'week' ? 7 : 30;
            const cutoff = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

            return sessionDate >= cutoff;
        });
        return filtered;
    };

    const filteredHistory = getFilteredHistory();

    // Calculate recent progress
    const getRecentProgress = () => {
        if (filteredHistory.length < 2) return 0;

        const recent = filteredHistory.slice(-5);
        const older = filteredHistory.slice(-10, -5);

        if (older.length === 0) return 0;

        const recentAvg = recent.reduce((sum, s) => sum + s.wpm, 0) / recent.length;
        const olderAvg = older.reduce((sum, s) => sum + s.wpm, 0) / older.length;

        return Math.round(((recentAvg - olderAvg) / olderAvg) * 100);
    };

    const progressChange = getRecentProgress();

    const statCards: StatCard[] = [
        {
            title: 'Average WPM',
            value: overallStats.averageWPM,
            icon: TrendingUp,
            color: 'blue',
            change: progressChange > 0 ? `+${progressChange}%` : progressChange < 0 ? `${progressChange}%` : '0%',
        },
        {
            title: 'Average Accuracy',
            value: `${overallStats.averageAccuracy}%`,
            icon: Target,
            color: 'green',
        },
        {
            title: 'Total Sessions',
            value: overallStats.totalSessions,
            icon: BarChart3,
            color: 'purple',
        },
        {
            title: 'Total Time',
            value: `${Math.round(overallStats.totalTime / 60)}m`,
            icon: Clock,
            color: 'orange',
        },
        {
            title: 'Lessons Completed',
            value: userProgress?.totalLessonsCompleted || 0,
            icon: Trophy,
            color: 'yellow',
        },
        {
            title: 'Days Active',
            value: userProgress
                ? Math.ceil((new Date().getTime() - userProgress.createdAt.getTime()) / (1000 * 60 * 60 * 24))
                : 0,
            icon: Calendar,
            color: 'indigo',
        },
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-500 text-blue-100',
            green: 'bg-green-500 text-green-100',
            purple: 'bg-purple-500 text-purple-100',
            orange: 'bg-orange-500 text-orange-100',
            yellow: 'bg-yellow-500 text-yellow-100',
            indigo: 'bg-indigo-500 text-indigo-100',
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    const getBestLessonStats = () => {
        if (!userProgress?.bestStats) return [];

        return Object.entries(userProgress.bestStats)
            .map(([lessonId, stats]) => ({
                lesson: getLessonById(lessonId),
                stats,
            }))
            .filter(item => item.lesson)
            .sort((a, b) => b.stats.wpm - a.stats.wpm)
            .slice(0, 5);
    };

    const getRecentSessions = () => {
        return practiceHistory
            .slice(-10)
            .reverse()
            .map((session, index) => ({
                id: index,
                ...session,
                date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
            }));
    };

    const bestLessons = getBestLessonStats();
    const recentSessions = getRecentSessions();

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Statistics</h1>
                    <p className='mt-2 text-gray-600'>Track your typing progress and performance over time</p>
                </div>

                {/* Time Frame Selector */}
                <div className='mb-8'>
                    <div className='flex space-x-1 rounded-lg bg-gray-200 p-1'>
                        {['week', 'month', 'all'].map(frame => (
                            <button
                                key={frame}
                                onClick={() => setTimeFrame(frame as any)}
                                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    timeFrame === frame
                                        ? 'bg-white text-gray-900 shadow'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}>
                                {frame === 'all'
                                    ? 'All Time'
                                    : `Last ${frame.charAt(0).toUpperCase() + frame.slice(1)}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {statCards.map((stat, index) => (
                        <div key={index} className='rounded-lg bg-white p-6 shadow-md'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-gray-600'>{stat.title}</p>
                                    <p className='mt-2 text-3xl font-bold text-gray-900'>{stat.value}</p>
                                    {stat.change && (
                                        <p
                                            className={`mt-1 text-sm ${
                                                stat.change.startsWith('+')
                                                    ? 'text-green-600'
                                                    : stat.change.startsWith('-')
                                                      ? 'text-red-600'
                                                      : 'text-gray-600'
                                            }`}>
                                            {stat.change} this period
                                        </p>
                                    )}
                                </div>
                                <div className={`rounded-lg p-3 ${getColorClasses(stat.color)}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                    {/* Best Lesson Performance */}
                    <div className='rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>Best Lesson Performance</h2>
                        {bestLessons.length > 0 ? (
                            <div className='space-y-3'>
                                {bestLessons.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                        <div className='flex-1'>
                                            <h3 className='font-medium text-gray-900'>{item.lesson?.title}</h3>
                                            <p className='text-sm text-gray-600'>
                                                {item.lesson?.level} • {item.lesson?.language}
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='font-bold text-blue-600'>{item.stats.wpm} WPM</p>
                                            <p className='text-sm text-green-600'>{item.stats.accuracy}% accuracy</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='py-8 text-center text-gray-500'>
                                <Trophy className='mx-auto mb-3 h-12 w-12 text-gray-300' />
                                <p>Complete lessons to see your best performances!</p>
                            </div>
                        )}
                    </div>

                    {/* Recent Sessions */}
                    <div className='rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>Recent Sessions</h2>
                        {recentSessions.length > 0 ? (
                            <div className='space-y-3'>
                                {recentSessions.map((session, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                        <div className='flex-1'>
                                            <p className='font-medium text-gray-900'>{session.date}</p>
                                            <p className='text-sm text-gray-600'>
                                                {Math.round(session.timeElapsed)}s • {session.totalCharacters} chars
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='font-bold text-blue-600'>{session.wpm} WPM</p>
                                            <p className='text-sm text-green-600'>{session.accuracy}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='py-8 text-center text-gray-500'>
                                <BarChart3 className='mx-auto mb-3 h-12 w-12 text-gray-300' />
                                <p>Start practicing to see your session history!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Chart Area */}
                <div className='mt-8 rounded-lg bg-white p-6 shadow-md'>
                    <h2 className='mb-4 text-xl font-bold text-gray-900'>Progress Over Time</h2>
                    {practiceHistory.length > 0 ? (
                        <div className='flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                            <div className='text-center text-gray-500'>
                                <TrendingUp className='mx-auto mb-3 h-12 w-12 text-gray-300' />
                                <p className='text-lg'>Progress Chart</p>
                                <p className='text-sm'>Interactive chart visualization coming soon!</p>
                                <div className='mt-4 flex justify-center space-x-6 text-sm'>
                                    <div>
                                        <span className='font-medium'>Sessions:</span> {practiceHistory.length}
                                    </div>
                                    <div>
                                        <span className='font-medium'>Best WPM:</span>{' '}
                                        {Math.max(...practiceHistory.map(s => s.wpm))}
                                    </div>
                                    <div>
                                        <span className='font-medium'>Best Accuracy:</span>{' '}
                                        {Math.max(...practiceHistory.map(s => s.accuracy))}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='py-16 text-center text-gray-500'>
                            <TrendingUp className='mx-auto mb-3 h-12 w-12 text-gray-300' />
                            <p>Complete some typing sessions to see your progress!</p>
                        </div>
                    )}
                </div>

                {/* Accuracy Breakdown */}
                {userProgress?.bestStats && Object.keys(userProgress.bestStats).length > 0 && (
                    <div className='mt-8 rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>Accuracy by Lesson Level</h2>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                            {['beginner', 'intermediate', 'advanced'].map(level => {
                                const levelLessons = Object.entries(userProgress.bestStats)
                                    .filter(([lessonId]) => getLessonById(lessonId)?.level === level)
                                    .map(([, stats]) => stats);

                                if (levelLessons.length === 0) return null;

                                const avgAccuracy = Math.round(
                                    levelLessons.reduce((sum, stats) => sum + stats.accuracy, 0) / levelLessons.length,
                                );

                                const avgWPM = Math.round(
                                    levelLessons.reduce((sum, stats) => sum + stats.wpm, 0) / levelLessons.length,
                                );

                                return (
                                    <div key={level} className='rounded-lg bg-gray-50 p-4'>
                                        <h3 className='font-medium text-gray-900 capitalize'>{level}</h3>
                                        <div className='mt-2 space-y-1'>
                                            <div className='flex justify-between text-sm'>
                                                <span>Accuracy:</span>
                                                <span className='font-medium'>{avgAccuracy}%</span>
                                            </div>
                                            <div className='flex justify-between text-sm'>
                                                <span>Avg WPM:</span>
                                                <span className='font-medium'>{avgWPM}</span>
                                            </div>
                                            <div className='flex justify-between text-sm'>
                                                <span>Completed:</span>
                                                <span className='font-medium'>{levelLessons.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
