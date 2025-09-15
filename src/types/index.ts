export interface Lesson {
    id: string;
    title: string;
    language: 'english' | 'bengali';
    level: 'beginner' | 'intermediate' | 'advanced';
    content: string;
    targetWPM?: number;
    minAccuracy?: number;
    isLocked: boolean;
    order: number;
}

export interface TypingStats {
    wpm: number;
    accuracy: number;
    totalCharacters: number;
    correctCharacters: number;
    incorrectCharacters: number;
    timeElapsed: number;
    errors: TypingError[];
}

export interface TypingError {
    position: number;
    expected: string;
    typed: string;
    timestamp: number;
}

export interface UserProgress {
    userId: string;
    completedLessons: string[];
    bestStats: Record<string, TypingStats>;
    totalLessonsCompleted: number;
    averageWPM: number;
    averageAccuracy: number;
    timeSpent: number; // in minutes
    createdAt: Date;
    lastActive: Date;
}

export interface PracticeText {
    id: string;
    title: string;
    content: string;
    category: 'story' | 'random-words' | 'custom';
    difficulty: 'easy' | 'medium' | 'hard';
    language: 'english' | 'bengali';
}

export interface TestConfig {
    duration: number; // in seconds
    mode: 'timed' | 'words' | 'lesson';
    wordCount?: number;
    lessonId?: string;
    practiceTextId?: string;
}

export interface TypingState {
    currentText: string;
    userInput: string;
    currentPosition: number;
    isActive: boolean;
    startTime: number | null;
    endTime: number | null;
    errors: TypingError[];
    wpm: number;
    accuracy: number;
}

export type Language = 'english' | 'bengali';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type PracticeMode = 'lesson' | 'practice' | 'timed-test';
