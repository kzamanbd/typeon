import React, { useEffect, useRef } from 'react';
import { getCharacterStatus } from '../utils/typingUtils';

interface TypingAreaProps {
    text: string;
    userInput: string;
    onInputChange: (value: string) => void;
    isActive: boolean;
    className?: string;
}

export const TypingArea: React.FC<TypingAreaProps> = ({ text, userInput, onInputChange, isActive, className = '' }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isActive]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onInputChange(e.target.value);
    };

    const renderText = () => {
        return text.split('').map((char, index) => {
            const status = getCharacterStatus(text, userInput, index);

            let className = 'transition-colors duration-150 ';

            switch (status) {
                case 'correct':
                    className += 'bg-green-200 text-green-800';
                    break;
                case 'incorrect':
                    className += 'bg-red-200 text-red-800';
                    break;
                case 'current':
                    className += 'bg-blue-200 text-blue-800 animate-pulse';
                    break;
                case 'pending':
                    className += 'text-gray-600';
                    break;
                default:
                    className += 'text-gray-600';
            }

            return (
                <span key={index} className={className}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            );
        });
    };

    return (
        <div className={`relative ${className}`}>
            {/* Display Text */}
            <div className='mb-4 min-h-[120px] rounded-lg border-2 border-gray-200 bg-gray-50 p-6'>
                <div className='font-mono text-lg leading-relaxed tracking-wide'>{renderText()}</div>
            </div>

            {/* Input Area */}
            <div className='relative'>
                <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    className='w-full resize-none rounded-lg border-2 border-gray-300 p-4 font-mono text-lg transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                    placeholder='Start typing here...'
                    rows={4}
                    disabled={!isActive}
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                />

                {/* Character count indicator */}
                <div className='absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-sm text-gray-500'>
                    {userInput.length} / {text.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className='mt-2 h-2 w-full rounded-full bg-gray-200'>
                <div
                    className='h-2 rounded-full bg-blue-500 transition-all duration-300 ease-out'
                    style={{
                        width: `${Math.min((userInput.length / text.length) * 100, 100)}%`,
                    }}
                />
            </div>
        </div>
    );
};
