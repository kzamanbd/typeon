import { useCallback, useEffect, useRef, useState } from 'react';
import type { TypingState, TypingStats } from '../types';
import { analyzeTyping, calculateAccuracy, calculateWPM } from '../utils/typingUtils';

interface UseTypingProps {
    text: string;
    onComplete?: (stats: TypingStats) => void;
    onProgress?: (stats: Partial<TypingStats>) => void;
}

export const useTyping = ({ text, onComplete, onProgress }: UseTypingProps) => {
    const [state, setState] = useState<TypingState>({
        currentText: text,
        userInput: '',
        currentPosition: 0,
        isActive: false,
        startTime: null,
        endTime: null,
        errors: [],
        wpm: 0,
        accuracy: 100,
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Update current text when prop changes
    useEffect(() => {
        setState(prev => ({
            ...prev,
            currentText: text,
            userInput: '',
            currentPosition: 0,
            isActive: false,
            startTime: null,
            endTime: null,
            errors: [],
            wpm: 0,
            accuracy: 100,
        }));
    }, [text]);

    // Real-time stats calculation
    useEffect(() => {
        if (state.isActive && state.startTime && state.userInput.length > 0) {
            const currentTime = Date.now();
            const timeElapsed = (currentTime - state.startTime) / 1000;

            let correctChars = 0;
            const minLength = Math.min(state.currentText.length, state.userInput.length);

            for (let i = 0; i < minLength; i++) {
                if (state.currentText[i] === state.userInput[i]) {
                    correctChars++;
                }
            }

            const totalChars = Math.max(state.currentText.length, state.userInput.length);
            const currentWPM = calculateWPM(correctChars, timeElapsed);
            const currentAccuracy = calculateAccuracy(correctChars, totalChars);

            setState(prev => ({
                ...prev,
                wpm: currentWPM,
                accuracy: currentAccuracy,
            }));

            onProgress?.({
                wpm: currentWPM,
                accuracy: currentAccuracy,
                timeElapsed,
                correctCharacters: correctChars,
                totalCharacters: totalChars,
            });
        }
    }, [state.userInput, state.isActive, state.startTime, state.currentText, onProgress]);

    const startTyping = useCallback(() => {
        const now = Date.now();
        setState(prev => ({
            ...prev,
            isActive: true,
            startTime: now,
            endTime: null,
        }));

        // Start a timer for continuous updates
        intervalRef.current = setInterval(() => {
            setState(prev => {
                if (!prev.isActive || !prev.startTime) return prev;

                // const currentTime = Date.now();
                // const timeElapsed = (currentTime - prev.startTime) / 1000;

                return {
                    ...prev,
                    // This will trigger the useEffect above for stats calculation
                };
            });
        }, 100); // Update every 100ms for smooth real-time stats
    }, []);

    const stopTyping = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        const now = Date.now();
        setState(prev => {
            const newState = {
                ...prev,
                isActive: false,
                endTime: now,
            };

            if (prev.startTime) {
                const finalStats = analyzeTyping(prev.currentText, prev.userInput, prev.startTime, now);

                onComplete?.(finalStats);

                return {
                    ...newState,
                    wpm: finalStats.wpm,
                    accuracy: finalStats.accuracy,
                    errors: finalStats.errors,
                };
            }

            return newState;
        });
    }, [onComplete]);

    const resetTyping = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setState(prev => ({
            ...prev,
            userInput: '',
            currentPosition: 0,
            isActive: false,
            startTime: null,
            endTime: null,
            errors: [],
            wpm: 0,
            accuracy: 100,
        }));
    }, []);

    const updateInput = useCallback(
        (input: string) => {
            setState(prev => {
                const newState = {
                    ...prev,
                    userInput: input,
                    currentPosition: input.length,
                };

                // Auto-start typing on first character
                if (!prev.isActive && input.length === 1 && !prev.startTime) {
                    const now = Date.now();
                    newState.isActive = true;
                    newState.startTime = now;

                    // Start the interval timer
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    intervalRef.current = setInterval(() => {
                        // Timer logic is handled in useEffect
                    }, 100);
                }

                // Auto-complete when text is fully typed
                if (input.length >= prev.currentText.length && prev.isActive) {
                    const now = Date.now();
                    newState.isActive = false;
                    newState.endTime = now;

                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }

                    if (prev.startTime) {
                        const finalStats = analyzeTyping(prev.currentText, input, prev.startTime, now);

                        setTimeout(() => onComplete?.(finalStats), 100);

                        newState.wpm = finalStats.wpm;
                        newState.accuracy = finalStats.accuracy;
                        newState.errors = finalStats.errors;
                    }
                }

                return newState;
            });
        },
        [onComplete],
    );

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return {
        ...state,
        startTyping,
        stopTyping,
        resetTyping,
        updateInput,
        isCompleted: state.userInput.length >= state.currentText.length && !state.isActive,
    };
};
