import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import type { TypingStats, UserProgress } from '../types';
import {
    calculateOverallStats,
    loadLessonStats,
    loadUserProgress,
    saveLessonStats,
    savePracticeSession,
    saveUserProgress,
} from '../utils/localStorage';

interface ProgressContextType {
    userProgress: UserProgress | null;
    lessonStats: Record<string, TypingStats>;
    overallStats: {
        averageWPM: number;
        averageAccuracy: number;
        totalSessions: number;
        totalTime: number;
    };
    completeLesson: (lessonId: string, stats: TypingStats) => void;
    savePracticeStats: (stats: TypingStats) => void;
    getLessonBestStats: (lessonId: string) => TypingStats | null;
    isLessonCompleted: (lessonId: string) => boolean;
    refreshStats: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

interface ProgressProviderProps {
    children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    const [lessonStats, setLessonStats] = useState<Record<string, TypingStats>>({});
    const [overallStats, setOverallStats] = useState({
        averageWPM: 0,
        averageAccuracy: 0,
        totalSessions: 0,
        totalTime: 0,
    });

    // Initialize user progress
    useEffect(() => {
        const loadedProgress = loadUserProgress();

        if (!loadedProgress) {
            // Create new user progress
            const newProgress: UserProgress = {
                userId: 'user_' + Date.now(),
                completedLessons: [],
                bestStats: {},
                totalLessonsCompleted: 0,
                averageWPM: 0,
                averageAccuracy: 0,
                timeSpent: 0,
                createdAt: new Date(),
                lastActive: new Date(),
            };

            setUserProgress(newProgress);
            saveUserProgress(newProgress);
        } else {
            setUserProgress(loadedProgress);
        }

        refreshStats();
    }, []);

    const refreshStats = () => {
        setOverallStats(calculateOverallStats());
    };

    const completeLesson = (lessonId: string, stats: TypingStats) => {
        if (!userProgress) return;

        // Save lesson stats
        saveLessonStats(lessonId, stats);

        // Update lesson stats state
        setLessonStats(prev => ({
            ...prev,
            [lessonId]: stats,
        }));

        // Update user progress
        const updatedProgress: UserProgress = {
            ...userProgress,
            completedLessons: userProgress.completedLessons.includes(lessonId)
                ? userProgress.completedLessons
                : [...userProgress.completedLessons, lessonId],
            bestStats: {
                ...userProgress.bestStats,
                [lessonId]: stats,
            },
            totalLessonsCompleted: userProgress.completedLessons.includes(lessonId)
                ? userProgress.totalLessonsCompleted
                : userProgress.totalLessonsCompleted + 1,
            lastActive: new Date(),
        };

        setUserProgress(updatedProgress);
        saveUserProgress(updatedProgress);
        refreshStats();
    };

    const savePracticeStats = (stats: TypingStats) => {
        savePracticeSession(stats);
        refreshStats();
    };

    const getLessonBestStats = (lessonId: string): TypingStats | null => {
        // Try to get from state first, then from localStorage
        return lessonStats[lessonId] || loadLessonStats(lessonId);
    };

    const isLessonCompleted = (lessonId: string): boolean => {
        return userProgress?.completedLessons.includes(lessonId) || false;
    };

    const value: ProgressContextType = {
        userProgress,
        lessonStats,
        overallStats,
        completeLesson,
        savePracticeStats,
        getLessonBestStats,
        isLessonCompleted,
        refreshStats,
    };

    return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};
