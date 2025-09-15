import type { TypingStats, UserProgress } from '../types';

const STORAGE_KEYS = {
    USER_PROGRESS: 'typing_master_user_progress',
    LESSON_STATS: 'typing_master_lesson_stats',
    PRACTICE_STATS: 'typing_master_practice_stats',
    SETTINGS: 'typing_master_settings',
};

export const loadUserProgress = (): UserProgress | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
        if (!data) return null;

        const progress = JSON.parse(data);
        return {
            ...progress,
            createdAt: new Date(progress.createdAt),
            lastActive: new Date(progress.lastActive),
        };
    } catch (error) {
        console.error('Error loading user progress:', error);
        return null;
    }
};

export const saveUserProgress = (progress: UserProgress): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving user progress:', error);
    }
};

export const loadLessonStats = (lessonId: string): TypingStats | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.LESSON_STATS);
        if (!data) return null;

        const allStats = JSON.parse(data);
        return allStats[lessonId] || null;
    } catch (error) {
        console.error('Error loading lesson stats:', error);
        return null;
    }
};

export const saveLessonStats = (lessonId: string, stats: TypingStats): void => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.LESSON_STATS);
        const allStats = data ? JSON.parse(data) : {};

        // Only save if it's better than previous attempt
        const existing = allStats[lessonId];
        if (
            !existing ||
            stats.wpm > existing.wpm ||
            (stats.wpm === existing.wpm && stats.accuracy > existing.accuracy)
        ) {
            allStats[lessonId] = stats;
            localStorage.setItem(STORAGE_KEYS.LESSON_STATS, JSON.stringify(allStats));
        }
    } catch (error) {
        console.error('Error saving lesson stats:', error);
    }
};

export const loadPracticeHistory = (): TypingStats[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading practice history:', error);
        return [];
    }
};

export const savePracticeSession = (stats: TypingStats): void => {
    try {
        const history = loadPracticeHistory();
        history.push({
            ...stats,
            timeElapsed: stats.timeElapsed, // Ensure timestamp is preserved
        });

        // Keep only last 100 sessions
        if (history.length > 100) {
            history.splice(0, history.length - 100);
        }

        localStorage.setItem(STORAGE_KEYS.PRACTICE_STATS, JSON.stringify(history));
    } catch (error) {
        console.error('Error saving practice session:', error);
    }
};

export const loadSettings = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data
            ? JSON.parse(data)
            : {
                  language: 'english',
                  theme: 'light',
                  soundEffects: true,
                  showTargets: true,
                  autoAdvance: false,
              };
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            language: 'english',
            theme: 'light',
            soundEffects: true,
            showTargets: true,
            autoAdvance: false,
        };
    }
};

export const saveSettings = (settings: any): void => {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
};

export const clearAllData = (): void => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};

export const calculateOverallStats = (): {
    averageWPM: number;
    averageAccuracy: number;
    totalSessions: number;
    totalTime: number;
} => {
    const practiceHistory = loadPracticeHistory();

    if (practiceHistory.length === 0) {
        return {
            averageWPM: 0,
            averageAccuracy: 0,
            totalSessions: 0,
            totalTime: 0,
        };
    }

    const totalWPM = practiceHistory.reduce((sum, session) => sum + session.wpm, 0);
    const totalAccuracy = practiceHistory.reduce((sum, session) => sum + session.accuracy, 0);
    const totalTime = practiceHistory.reduce((sum, session) => sum + session.timeElapsed, 0);

    return {
        averageWPM: Math.round(totalWPM / practiceHistory.length),
        averageAccuracy: Math.round(totalAccuracy / practiceHistory.length),
        totalSessions: practiceHistory.length,
        totalTime: Math.round(totalTime),
    };
};
