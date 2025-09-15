import { BookOpen, Clock, Hash, Play, RotateCcw } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StatsDisplay } from '../components/StatsDisplay';
import { TypingArea } from '../components/TypingArea';
import { useProgress } from '../contexts/ProgressContext';
import { allPracticeTexts, generateRandomText } from '../data/practiceTexts';
import { useTyping } from '../hooks/useTyping';
import { PracticeMode, TypingStats } from '../types';

export const PracticePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { savePracticeStats } = useProgress();
    const initialMode = (searchParams.get('mode') as PracticeMode) || 'practice';

    const [practiceMode, setPracticeMode] = useState<PracticeMode>(initialMode);
    const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'bengali'>('english');
    const [selectedDuration, setSelectedDuration] = useState<number>(60); // seconds
    const [selectedWordCount, setSelectedWordCount] = useState<number>(50);
    const [selectedTextId, setSelectedTextId] = useState<string>('');
    const [currentText, setCurrentText] = useState<string>('');
    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalStats, setFinalStats] = useState<TypingStats | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

    const { userInput, updateInput, isActive, startTyping, stopTyping, resetTyping, wpm, accuracy, startTime } =
        useTyping({
            text: currentText,
            onComplete: stats => {
                setIsCompleted(true);
                setFinalStats(stats);
                setIsStarted(false);
                savePracticeStats(stats);
                if (timerInterval) {
                    clearInterval(timerInterval);
                    setTimerInterval(null);
                }
            },
        });

    const generatePracticeText = useCallback(() => {
        let text = '';

        switch (practiceMode) {
            case 'practice':
                const practiceTexts = allPracticeTexts.filter(t => t.language === selectedLanguage);
                if (practiceTexts.length > 0) {
                    const randomText = practiceTexts[Math.floor(Math.random() * practiceTexts.length)];
                    text = randomText.content;
                    setSelectedTextId(randomText.id);
                }
                break;

            case 'timed-test':
                text = generateRandomText(selectedLanguage, selectedWordCount);
                setTimeRemaining(selectedDuration);
                break;

            default:
                text = generateRandomText(selectedLanguage, selectedWordCount);
        }

        setCurrentText(text);
    }, [practiceMode, selectedLanguage, selectedWordCount, selectedDuration]);

    const startPractice = () => {
        if (!currentText) {
            generatePracticeText();
        }

        setIsStarted(true);
        setIsCompleted(false);
        setFinalStats(null);
        startTyping();

        // Start timer for timed tests
        if (practiceMode === 'timed-test') {
            setTimeRemaining(selectedDuration);
            const interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        stopTyping();
                        setIsCompleted(true);
                        setIsStarted(false);
                        clearInterval(interval);
                        setTimerInterval(null);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setTimerInterval(interval);
        }
    };

    const resetPractice = () => {
        setIsStarted(false);
        setIsCompleted(false);
        setFinalStats(null);
        setTimeRemaining(selectedDuration);
        resetTyping();

        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }

        generatePracticeText();
    };

    const handleInputChange = (value: string) => {
        if (!isStarted && value.length > 0) {
            startPractice();
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

    const practiceOptions = [
        {
            value: 'practice',
            label: 'Story Practice',
            icon: BookOpen,
            description: 'Type predefined stories and texts',
        },
        { value: 'timed-test', label: 'Timed Test', icon: Clock, description: 'Test your speed in a fixed time' },
        { value: 'random', label: 'Random Words', icon: Hash, description: 'Practice with random word sequences' },
    ];

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='mb-2 text-3xl font-bold text-gray-900'>Practice Typing</h1>
                    <p className='text-gray-600'>Improve your typing skills with various practice modes</p>
                </div>

                {/* Practice Mode Selection */}
                <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
                    <h2 className='mb-4 text-xl font-semibold text-gray-800'>Choose Practice Mode</h2>
                    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                        {practiceOptions.map(option => (
                            <button
                                key={option.value}
                                onClick={() => setPracticeMode(option.value as PracticeMode)}
                                className={`rounded-lg border-2 p-4 text-left transition-all duration-200 ${
                                    practiceMode === option.value
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                } `}>
                                <div className='mb-2 flex items-center space-x-3'>
                                    <option.icon size={24} />
                                    <span className='font-medium'>{option.label}</span>
                                </div>
                                <p className='text-sm text-gray-600'>{option.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Configuration Options */}
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div>
                            <label className='mb-2 block text-sm font-medium text-gray-700'>Language</label>
                            <select
                                value={selectedLanguage}
                                onChange={e => setSelectedLanguage(e.target.value as 'english' | 'bengali')}
                                className='w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                                <option value='english'>🇺🇸 English</option>
                                <option value='bengali'>🇧🇩 Bengali</option>
                            </select>
                        </div>

                        {practiceMode === 'timed-test' && (
                            <div>
                                <label className='mb-2 block text-sm font-medium text-gray-700'>
                                    Duration (seconds)
                                </label>
                                <select
                                    value={selectedDuration}
                                    onChange={e => setSelectedDuration(Number(e.target.value))}
                                    className='w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                                    <option value={60}>1 minute</option>
                                    <option value={180}>3 minutes</option>
                                    <option value={300}>5 minutes</option>
                                </select>
                            </div>
                        )}

                        {(practiceMode === 'random' || practiceMode === 'timed-test') && (
                            <div>
                                <label className='mb-2 block text-sm font-medium text-gray-700'>Word Count</label>
                                <select
                                    value={selectedWordCount}
                                    onChange={e => setSelectedWordCount(Number(e.target.value))}
                                    className='w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                                    <option value={25}>25 words</option>
                                    <option value={50}>50 words</option>
                                    <option value={100}>100 words</option>
                                    <option value={200}>200 words</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className='mt-6 flex items-center justify-between'>
                        <button
                            onClick={generatePracticeText}
                            className='rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700'>
                            Generate New Text
                        </button>

                        <div className='flex items-center space-x-2'>
                            {practiceMode === 'timed-test' && timeRemaining > 0 && isStarted && (
                                <div className='rounded-lg bg-red-100 px-3 py-1 font-medium text-red-800'>
                                    ⏱️ {Math.floor(timeRemaining / 60)}:
                                    {(timeRemaining % 60).toString().padStart(2, '0')}
                                </div>
                            )}

                            <button
                                onClick={isActive ? stopTyping : startPractice}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                                    isActive
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                } `}
                                disabled={isCompleted || !currentText}>
                                <Play size={20} />
                                <span>{isActive ? 'Stop' : 'Start'}</span>
                            </button>

                            <button
                                onClick={resetPractice}
                                className='flex items-center space-x-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50'>
                                <RotateCcw size={20} />
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Display */}
                {currentText && <StatsDisplay stats={currentStats} isRealTime={isActive} className='mb-8' />}

                {/* Typing Area */}
                {currentText && (
                    <div className='mb-8 rounded-lg bg-white p-6 shadow-md'>
                        <TypingArea
                            text={currentText}
                            userInput={userInput}
                            onInputChange={handleInputChange}
                            isActive={!isCompleted}
                        />
                    </div>
                )}

                {/* Completion Results */}
                {isCompleted && finalStats && (
                    <div className='rounded-lg border border-green-200 bg-green-50 p-6 text-center'>
                        <h2 className='mb-4 text-2xl font-bold text-green-800'>🎉 Practice Completed!</h2>

                        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-blue-600'>{finalStats.wpm}</div>
                                <div className='text-sm text-gray-600'>WPM</div>
                            </div>

                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-green-600'>{finalStats.accuracy}%</div>
                                <div className='text-sm text-gray-600'>Accuracy</div>
                            </div>

                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-purple-600'>
                                    {Math.round(finalStats.timeElapsed)}s
                                </div>
                                <div className='text-sm text-gray-600'>Time</div>
                            </div>

                            <div className='rounded-lg bg-white p-4'>
                                <div className='text-2xl font-bold text-orange-600'>{finalStats.errors.length}</div>
                                <div className='text-sm text-gray-600'>Errors</div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                            <button
                                onClick={resetPractice}
                                className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'>
                                Practice Again
                            </button>
                            <button
                                onClick={generatePracticeText}
                                className='rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700'>
                                New Text
                            </button>
                        </div>
                    </div>
                )}

                {/* Initial State */}
                {!currentText && (
                    <div className='rounded-lg bg-white p-12 text-center shadow-md'>
                        <div className='mb-4 text-gray-400'>
                            <BookOpen size={48} className='mx-auto' />
                        </div>
                        <h3 className='mb-2 text-xl font-medium text-gray-900'>Ready to Practice?</h3>
                        <p className='mb-6 text-gray-600'>
                            Configure your practice settings above and generate text to start typing.
                        </p>
                        <button
                            onClick={generatePracticeText}
                            className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'>
                            Generate Practice Text
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
