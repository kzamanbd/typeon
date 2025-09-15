import { ArrowLeft, Pause, Play, RotateCcw } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatsDisplay } from '../components/StatsDisplay';
import { TypingArea } from '../components/TypingArea';
import { useProgress } from '../contexts/ProgressContext';
import { getLessonById } from '../data/lessons';
import { useTyping } from '../hooks/useTyping';
import type { TypingStats } from '../types';

export const LessonDetailPage: React.FC = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const { completeLesson, getLessonBestStats, isLessonCompleted } = useProgress();
    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalStats, setFinalStats] = useState<TypingStats | null>(null);

    const lesson = lessonId ? getLessonById(lessonId) : null;
    const bestStats = lessonId ? getLessonBestStats(lessonId) : null;
    const lessonCompleted = lessonId ? isLessonCompleted(lessonId) : false;

    const handleComplete = useCallback(
        (stats: TypingStats) => {
            setIsCompleted(true);
            setFinalStats(stats);
            setIsStarted(false);

            // Save lesson completion
            if (lessonId) {
                completeLesson(lessonId, stats);
            }
        },
        [lessonId, completeLesson],
    );

    const handleProgress = useCallback((_stats: Partial<TypingStats>) => {
        // Real-time stats are handled by the hook
    }, []);

    const {
        userInput,
        updateInput,
        isActive,
        startTyping,
        stopTyping,
        resetTyping,
        wpm,
        accuracy,
        currentText,
        startTime,
    } = useTyping({
        text: lesson?.content || '',
        onComplete: handleComplete,
        onProgress: handleProgress,
    });

    useEffect(() => {
        if (!lesson) {
            navigate('/lessons');
        }
    }, [lesson, navigate]);

    if (!lesson) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-gray-50'>
                <div className='text-center'>
                    <h2 className='mb-4 text-2xl font-bold text-gray-900'>Lesson not found</h2>
                    <button
                        onClick={() => navigate('/lessons')}
                        className='rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700'>
                        Back to Lessons
                    </button>
                </div>
            </div>
        );
    }

    const handleStart = () => {
        setIsStarted(true);
        setIsCompleted(false);
        setFinalStats(null);
        startTyping();
    };

    const handleReset = () => {
        setIsStarted(false);
        setIsCompleted(false);
        setFinalStats(null);
        resetTyping();
    };

    const handleInputChange = (value: string) => {
        if (!isStarted && value.length > 0) {
            setIsStarted(true);
        }
        updateInput(value);
    };

    const currentStats = finalStats || {
        wpm,
        accuracy,
        timeElapsed: startTime ? (Date.now() - startTime) / 1000 : 0,
        correctCharacters: 0,
        totalCharacters: userInput.length,
        errors: [],
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-8 flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <button
                            onClick={() => navigate('/lessons')}
                            className='flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-800'>
                            <ArrowLeft size={20} />
                            <span>Back to Lessons</span>
                        </button>
                    </div>

                    <div className='flex items-center space-x-2'>
                        <button
                            onClick={isActive ? stopTyping : handleStart}
                            className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                                isActive
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            } `}
                            disabled={isCompleted}>
                            {isActive ? <Pause size={20} /> : <Play size={20} />}
                            <span>{isActive ? 'Pause' : 'Start'}</span>
                        </button>

                        <button
                            onClick={handleReset}
                            className='flex items-center space-x-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50'>
                            <RotateCcw size={20} />
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                {/* Lesson Info */}
                <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
                    <div className='mb-4 flex items-center justify-between'>
                        <h1 className='text-2xl font-bold text-gray-900'>{lesson.title}</h1>
                        <div className='flex items-center space-x-3'>
                            <span className='text-2xl'>{lesson.language === 'english' ? '🇺🇸' : '🇧🇩'}</span>
                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${
                                    lesson.level === 'beginner'
                                        ? 'bg-green-100 text-green-800'
                                        : lesson.level === 'intermediate'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                } `}>
                                {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                            </span>
                            {lessonCompleted && (
                                <span className='rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800'>
                                    ✅ Completed
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2'>
                        {lesson.targetWPM && (
                            <div>
                                <span className='font-medium'>Target WPM:</span> {lesson.targetWPM}
                            </div>
                        )}
                        {lesson.minAccuracy && (
                            <div>
                                <span className='font-medium'>Min Accuracy:</span> {lesson.minAccuracy}%
                            </div>
                        )}
                    </div>

                    {/* Best Performance */}
                    {bestStats && (
                        <div className='mt-4 rounded-lg bg-blue-50 p-4'>
                            <h3 className='mb-2 font-medium text-blue-800'>Your Best Performance</h3>
                            <div className='grid grid-cols-2 gap-4 text-sm md:grid-cols-4'>
                                <div className='text-center'>
                                    <div className='font-bold text-blue-600'>{bestStats.wpm}</div>
                                    <div className='text-gray-600'>WPM</div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-bold text-green-600'>{bestStats.accuracy}%</div>
                                    <div className='text-gray-600'>Accuracy</div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-bold text-purple-600'>
                                        {Math.round(bestStats.timeElapsed)}s
                                    </div>
                                    <div className='text-gray-600'>Time</div>
                                </div>
                                <div className='text-center'>
                                    <div className='font-bold text-orange-600'>{bestStats.errors.length}</div>
                                    <div className='text-gray-600'>Errors</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Real-time Stats */}
                <StatsDisplay stats={currentStats} isRealTime={isActive} className='mb-8' />

                {/* Typing Area */}
                <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
                    <TypingArea
                        text={currentText}
                        userInput={userInput}
                        onInputChange={handleInputChange}
                        isActive={isStarted && !isCompleted}
                    />
                </div>

                {/* Completion Message */}
                {isCompleted && finalStats && (
                    <div className='rounded-lg border border-green-200 bg-green-50 p-6 text-center'>
                        <h2 className='mb-4 text-2xl font-bold text-green-800'>🎉 Lesson Completed!</h2>

                        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-blue-600'>{finalStats.wpm}</div>
                                <div className='text-sm text-gray-600'>Words Per Minute</div>
                            </div>

                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-green-600'>{finalStats.accuracy}%</div>
                                <div className='text-sm text-gray-600'>Accuracy</div>
                            </div>

                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-purple-600'>
                                    {Math.round(finalStats.timeElapsed)}s
                                </div>
                                <div className='text-sm text-gray-600'>Time Taken</div>
                            </div>
                        </div>

                        {/* Performance Analysis */}
                        <div className='mb-6 text-left'>
                            <h3 className='mb-2 font-semibold text-gray-800'>Performance Analysis</h3>
                            <div className='space-y-2 text-sm'>
                                {lesson.targetWPM && (
                                    <div
                                        className={`rounded p-2 ${
                                            finalStats.wpm >= lesson.targetWPM
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        } `}>
                                        Target WPM:{' '}
                                        {finalStats.wpm >= lesson.targetWPM ? '✅ Achieved' : '⚠️ Not reached'}(
                                        {finalStats.wpm}/{lesson.targetWPM})
                                    </div>
                                )}

                                {lesson.minAccuracy && (
                                    <div
                                        className={`rounded p-2 ${
                                            finalStats.accuracy >= lesson.minAccuracy
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        } `}>
                                        Min Accuracy:{' '}
                                        {finalStats.accuracy >= lesson.minAccuracy ? '✅ Achieved' : '⚠️ Not reached'}(
                                        {finalStats.accuracy}%/{lesson.minAccuracy}%)
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                            <button
                                onClick={handleReset}
                                className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'>
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/lessons')}
                                className='rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700'>
                                Back to Lessons
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
