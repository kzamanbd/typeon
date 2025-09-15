import { Award, Clock, Target, TrendingUp } from 'lucide-react';
import React from 'react';
import type { TypingStats } from '../types';
import { formatTime, getAccuracyLevel, getTypingLevel } from '../utils/typingUtils';

interface StatsDisplayProps {
    stats: Partial<TypingStats>;
    isRealTime?: boolean;
    className?: string;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, isRealTime = false, className = '' }) => {
    const { wpm = 0, accuracy = 100, timeElapsed = 0, correctCharacters = 0, totalCharacters = 0, errors = [] } = stats;

    const StatCard: React.FC<{
        icon: React.ReactNode;
        label: string;
        value: string | number;
        sublabel?: string;
        color?: string;
    }> = ({ icon, label, value, sublabel, color = 'blue' }) => (
        <div className={`rounded-lg border-l-4 bg-white p-4 shadow-md border-${color}-500`}>
            <div className='flex items-center justify-between'>
                <div className={`text-${color}-600`}>{icon}</div>
                <div className='text-right'>
                    <div className='text-2xl font-bold text-gray-800'>{value}</div>
                    <div className='text-sm text-gray-600'>{label}</div>
                    {sublabel && <div className='mt-1 text-xs text-gray-500'>{sublabel}</div>}
                </div>
            </div>
        </div>
    );

    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
            <StatCard
                icon={<TrendingUp size={24} />}
                label='Words Per Minute'
                value={wpm}
                sublabel={getTypingLevel(wpm)}
                color='blue'
            />

            <StatCard
                icon={<Target size={24} />}
                label='Accuracy'
                value={`${accuracy}%`}
                sublabel={getAccuracyLevel(accuracy)}
                color='green'
            />

            <StatCard
                icon={<Clock size={24} />}
                label='Time'
                value={formatTime(Math.round(timeElapsed))}
                sublabel={isRealTime ? 'Elapsed' : 'Total'}
                color='purple'
            />

            <StatCard
                icon={<Award size={24} />}
                label='Characters'
                value={`${correctCharacters}/${totalCharacters}`}
                sublabel={`${errors.length} errors`}
                color='orange'
            />
        </div>
    );
};
