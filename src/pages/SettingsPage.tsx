import { Download, RefreshCw, Trash2, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { clearAllData } from '../utils/localStorage';

interface ToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    label: string;
    description?: string;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label, description }) => (
    <div className='flex items-center justify-between py-3'>
        <div className='flex-1'>
            <label className='font-medium text-gray-900'>{label}</label>
            {description && <p className='text-sm text-gray-600'>{description}</p>}
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}>
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    label: string;
    description?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, label, description }) => (
    <div className='py-3'>
        <label className='block font-medium text-gray-900'>{label}</label>
        {description && <p className='text-sm text-gray-600'>{description}</p>}
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export const SettingsPage: React.FC = () => {
    const { settings, updateSetting, resetSettings, exportSettings, importSettings } = useSettings();
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);
    const [importResult, setImportResult] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExportSettings = () => {
        const settingsData = exportSettings();
        const blob = new Blob([settingsData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'typeon-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            const content = e.target?.result as string;
            const success = importSettings(content);
            setImportResult(
                success ? 'Settings imported successfully!' : 'Failed to import settings. Invalid file format.',
            );
            setTimeout(() => setImportResult(null), 3000);
        };
        reader.readAsText(file);
    };

    const handleResetSettings = () => {
        resetSettings();
        setShowResetConfirm(false);
    };

    const handleClearAllData = () => {
        clearAllData();
        setShowClearDataConfirm(false);
        window.location.reload(); // Refresh to reset all contexts
    };

    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'bengali', label: 'Bengali' },
    ];

    const themeOptions = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
    ];

    const fontSizeOptions = [
        { value: 'small', label: 'Small (14px)' },
        { value: 'medium', label: 'Medium (16px)' },
        { value: 'large', label: 'Large (18px)' },
    ];

    const fontFamilyOptions = [
        { value: 'mono', label: 'Monospace (Coding)' },
        { value: 'sans', label: 'Sans Serif (Modern)' },
        { value: 'serif', label: 'Serif (Traditional)' },
    ];

    const keyboardLayoutOptions = [
        { value: 'qwerty', label: 'QWERTY' },
        { value: 'dvorak', label: 'Dvorak' },
        { value: 'colemak', label: 'Colemak' },
    ];

    const practiceModeOptions = [
        { value: 'words', label: 'Individual Words' },
        { value: 'sentences', label: 'Sentences' },
        { value: 'paragraphs', label: 'Paragraphs' },
    ];

    const difficultyOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
    ];

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Settings</h1>
                    <p className='mt-2 text-gray-600'>Customize your typing experience and preferences</p>
                </div>

                {/* Import/Export Results */}
                {importResult && (
                    <div
                        className={`mb-6 rounded-lg p-4 ${
                            importResult.includes('successfully')
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                        {importResult}
                    </div>
                )}

                <div className='space-y-8'>
                    {/* General Settings */}
                    <div className='rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>General</h2>
                        <div className='space-y-1 divide-y divide-gray-200'>
                            <Select
                                label='Language'
                                description='Choose your preferred typing language'
                                value={settings.language}
                                onChange={value => updateSetting('language', value as any)}
                                options={languageOptions}
                            />
                            <Select
                                label='Theme'
                                description='Choose your preferred color theme'
                                value={settings.theme}
                                onChange={value => updateSetting('theme', value as any)}
                                options={themeOptions}
                            />
                            <Toggle
                                label='Sound Effects'
                                description='Play sounds for keystrokes and feedback'
                                enabled={settings.soundEffects}
                                onChange={value => updateSetting('soundEffects', value)}
                            />
                            <Toggle
                                label='Show Targets'
                                description='Display WPM and accuracy targets during lessons'
                                enabled={settings.showTargets}
                                onChange={value => updateSetting('showTargets', value)}
                            />
                            <Toggle
                                label='Auto Advance'
                                description='Automatically move to next lesson after completion'
                                enabled={settings.autoAdvance}
                                onChange={value => updateSetting('autoAdvance', value)}
                            />
                        </div>
                    </div>

                    {/* Typography Settings */}
                    <div className='rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>Typography</h2>
                        <div className='space-y-1 divide-y divide-gray-200'>
                            <Select
                                label='Font Size'
                                description='Size of text during typing practice'
                                value={settings.fontSize}
                                onChange={value => updateSetting('fontSize', value as any)}
                                options={fontSizeOptions}
                            />
                            <Select
                                label='Font Family'
                                description='Choose your preferred font style'
                                value={settings.fontFamily}
                                onChange={value => updateSetting('fontFamily', value as any)}
                                options={fontFamilyOptions}
                            />
                        </div>
                    </div>

                    {/* Typing Settings */}
                    <div className='rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>Typing</h2>
                        <div className='space-y-1 divide-y divide-gray-200'>
                            <Select
                                label='Keyboard Layout'
                                description='Your physical keyboard layout'
                                value={settings.keyboardLayout}
                                onChange={value => updateSetting('keyboardLayout', value as any)}
                                options={keyboardLayoutOptions}
                            />
                            <Select
                                label='Practice Mode'
                                description='Default practice text structure'
                                value={settings.practiceMode}
                                onChange={value => updateSetting('practiceMode', value as any)}
                                options={practiceModeOptions}
                            />
                            <Select
                                label='Difficulty Level'
                                description='Default difficulty for new sessions'
                                value={settings.difficultyLevel}
                                onChange={value => updateSetting('difficultyLevel', value as any)}
                                options={difficultyOptions}
                            />
                            <Toggle
                                label='Show Virtual Keyboard'
                                description='Display on-screen keyboard during practice'
                                enabled={settings.showKeyboard}
                                onChange={value => updateSetting('showKeyboard', value)}
                            />
                            <Toggle
                                label='Highlight Errors'
                                description='Highlight incorrect characters as you type'
                                enabled={settings.highlightErrors}
                                onChange={value => updateSetting('highlightErrors', value)}
                            />
                            <Toggle
                                label='Pause on Error'
                                description='Automatically pause when errors are detected'
                                enabled={settings.pauseOnError}
                                onChange={value => updateSetting('pauseOnError', value)}
                            />
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className='rounded-lg bg-white p-6 shadow-md'>
                        <h2 className='mb-4 text-xl font-bold text-gray-900'>Data Management</h2>

                        {/* Export/Import */}
                        <div className='mb-6'>
                            <h3 className='mb-3 text-lg font-medium text-gray-900'>Settings Backup</h3>
                            <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
                                <button
                                    onClick={handleExportSettings}
                                    className='flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                                    <Download size={20} />
                                    <span>Export Settings</span>
                                </button>

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className='flex items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50'>
                                    <Upload size={20} />
                                    <span>Import Settings</span>
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='.json'
                                    onChange={handleImportSettings}
                                    className='hidden'
                                />
                            </div>
                        </div>

                        {/* Reset Settings */}
                        <div className='mb-6'>
                            <h3 className='mb-3 text-lg font-medium text-gray-900'>Reset Options</h3>
                            <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
                                <button
                                    onClick={() => setShowResetConfirm(true)}
                                    className='flex items-center justify-center space-x-2 rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700'>
                                    <RefreshCw size={20} />
                                    <span>Reset Settings</span>
                                </button>

                                <button
                                    onClick={() => setShowClearDataConfirm(true)}
                                    className='flex items-center justify-center space-x-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'>
                                    <Trash2 size={20} />
                                    <span>Clear All Data</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reset Settings Confirmation */}
                {showResetConfirm && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                        <div className='mx-4 max-w-md rounded-lg bg-white p-6'>
                            <h3 className='mb-4 text-lg font-bold text-gray-900'>Reset Settings</h3>
                            <p className='mb-6 text-gray-600'>
                                Are you sure you want to reset all settings to their default values? This action cannot
                                be undone.
                            </p>
                            <div className='flex space-x-3'>
                                <button
                                    onClick={handleResetSettings}
                                    className='flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'>
                                    Reset Settings
                                </button>
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className='flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Clear All Data Confirmation */}
                {showClearDataConfirm && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                        <div className='mx-4 max-w-md rounded-lg bg-white p-6'>
                            <h3 className='mb-4 text-lg font-bold text-red-900'>Clear All Data</h3>
                            <p className='mb-6 text-gray-600'>
                                <strong>Warning:</strong> This will permanently delete all your progress, statistics,
                                lesson completions, and settings. This action cannot be undone.
                            </p>
                            <div className='flex space-x-3'>
                                <button
                                    onClick={handleClearAllData}
                                    className='flex-1 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'>
                                    Clear All Data
                                </button>
                                <button
                                    onClick={() => setShowClearDataConfirm(false)}
                                    className='flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50'>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
