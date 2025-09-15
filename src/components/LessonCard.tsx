import { CheckCircle, Clock, Lock, Target } from 'lucide-react';
import React from 'react';
import type { Lesson } from '../types';

interface LessonCardProps {
    lesson: Lesson;
    isCompleted?: boolean;
    bestStats?: {
        wpm: number;
        accuracy: number;
    };
    onClick: () => void;
    className?: string;
}

export const LessonCard: React.FC<LessonCardProps> = ({
    lesson,
    isCompleted = false,
    bestStats,
    onClick,
    className = '',
}) => {
    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'beginner':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'advanced':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getLanguageFlag = (language: string) => {
        return language === 'english' ? '🇺🇸' : '🇧🇩';
    };

    return (
        <div
            className={`relative cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-md transition-all duration-200 hover:border-blue-300 hover:shadow ${lesson.isLocked ? 'cursor-not-allowed opacity-60' : ''} ${className} `}
            onClick={lesson.isLocked ? undefined : onClick}>
            {/* Header */}
            <div className='border-b border-gray-100 p-4'>
                <div className='mb-2 flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <span className='text-lg'>{getLanguageFlag(lesson.language)}</span>
                        <h3 className='truncate font-semibold text-gray-800'>{lesson.title}</h3>
                    </div>

                    <div className='flex items-center space-x-2'>
                        {isCompleted && <CheckCircle size={20} className='text-green-600' />}
                        {lesson.isLocked && <Lock size={20} className='text-gray-400' />}
                    </div>
                </div>

                <div
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${getDifficultyColor(lesson.level)}`}>
                    {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                </div>
            </div>

            {/* Content Preview */}
            <div className='p-4'>
                <p className='mb-3 line-clamp-2 text-sm text-gray-600'>{lesson.content.substring(0, 100)}...</p>

                {/* Targets */}
                <div className='mb-3 grid grid-cols-2 gap-3'>
                    {lesson.targetWPM && (
                        <div className='flex items-center space-x-2 text-sm'>
                            <Clock size={16} className='text-blue-500' />
                            <span className='text-gray-600'>Target: {lesson.targetWPM} WPM</span>
                        </div>
                    )}

                    {lesson.minAccuracy && (
                        <div className='flex items-center space-x-2 text-sm'>
                            <Target size={16} className='text-green-500' />
                            <span className='text-gray-600'>Min: {lesson.minAccuracy}%</span>
                        </div>
                    )}
                </div>

                {/* Best Stats */}
                {bestStats && isCompleted && (
                    <div className='mt-3 rounded-lg bg-gray-50 p-3'>
                        <h4 className='mb-2 text-xs font-medium text-gray-500'>Your Best</h4>
                        <div className='grid grid-cols-2 gap-3 text-sm'>
                            <div>
                                <span className='font-medium text-blue-600'>{bestStats.wpm}</span>
                                <span className='ml-1 text-gray-600'>WPM</span>
                            </div>
                            <div>
                                <span className='font-medium text-green-600'>{bestStats.accuracy}%</span>
                                <span className='ml-1 text-gray-600'>Accuracy</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Indicator */}
            {isCompleted && (
                <div className='absolute top-0 right-0 h-0 w-0 border-t-[40px] border-l-[40px] border-t-green-500 border-l-transparent'>
                    <CheckCircle size={16} className='absolute -top-8 -right-6 text-white' />
                </div>
            )}
        </div>
    );
};
