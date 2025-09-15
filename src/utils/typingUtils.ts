import { TypingError, TypingStats } from '../types';

export const calculateWPM = (correctCharacters: number, timeElapsedSeconds: number): number => {
    if (timeElapsedSeconds === 0) return 0;

    // Standard WPM calculation: (correct characters / 5) / (time in minutes)
    const words = correctCharacters / 5;
    const minutes = timeElapsedSeconds / 60;
    return Math.round(words / minutes);
};

export const calculateAccuracy = (correctCharacters: number, totalCharacters: number): number => {
    if (totalCharacters === 0) return 100;
    return Math.round((correctCharacters / totalCharacters) * 100);
};

export const analyzeTyping = (
    originalText: string,
    userInput: string,
    startTime: number,
    endTime: number,
): TypingStats => {
    const errors: TypingError[] = [];
    let correctCharacters = 0;
    let incorrectCharacters = 0;

    const minLength = Math.min(originalText.length, userInput.length);

    // Analyze character by character
    for (let i = 0; i < minLength; i++) {
        if (originalText[i] === userInput[i]) {
            correctCharacters++;
        } else {
            incorrectCharacters++;
            errors.push({
                position: i,
                expected: originalText[i],
                typed: userInput[i],
                timestamp: Date.now(),
            });
        }
    }

    // Account for missing characters (if user input is shorter)
    if (userInput.length < originalText.length) {
        incorrectCharacters += originalText.length - userInput.length;
    }

    // Account for extra characters (if user input is longer)
    if (userInput.length > originalText.length) {
        incorrectCharacters += userInput.length - originalText.length;
        for (let i = originalText.length; i < userInput.length; i++) {
            errors.push({
                position: i,
                expected: '',
                typed: userInput[i],
                timestamp: Date.now(),
            });
        }
    }

    const totalCharacters = Math.max(originalText.length, userInput.length);
    const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds

    return {
        wpm: calculateWPM(correctCharacters, timeElapsed),
        accuracy: calculateAccuracy(correctCharacters, totalCharacters),
        totalCharacters,
        correctCharacters,
        incorrectCharacters,
        timeElapsed,
        errors,
    };
};

export const getCharacterStatus = (
    originalText: string,
    userInput: string,
    position: number,
): 'correct' | 'incorrect' | 'pending' | 'current' => {
    if (position >= userInput.length) {
        return position === userInput.length ? 'current' : 'pending';
    }

    if (position >= originalText.length) {
        return 'incorrect'; // Extra characters
    }

    return originalText[position] === userInput[position] ? 'correct' : 'incorrect';
};

export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${remainingSeconds}s`;
};

export const getTypingLevel = (wpm: number): string => {
    if (wpm < 20) return 'Beginner';
    if (wpm < 40) return 'Intermediate';
    if (wpm < 60) return 'Advanced';
    if (wpm < 80) return 'Expert';
    return 'Master';
};

export const getAccuracyLevel = (accuracy: number): string => {
    if (accuracy < 80) return 'Needs Improvement';
    if (accuracy < 90) return 'Good';
    if (accuracy < 95) return 'Very Good';
    if (accuracy < 98) return 'Excellent';
    return 'Perfect';
};
