import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { loadSettings, saveSettings } from '../utils/localStorage';

export interface AppSettings {
    language: 'english' | 'bengali';
    theme: 'light' | 'dark';
    soundEffects: boolean;
    showTargets: boolean;
    autoAdvance: boolean;
    fontSize: 'small' | 'medium' | 'large';
    fontFamily: 'mono' | 'sans' | 'serif';
    keyboardLayout: 'qwerty' | 'dvorak' | 'colemak';
    practiceMode: 'words' | 'sentences' | 'paragraphs';
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    showKeyboard: boolean;
    highlightErrors: boolean;
    pauseOnError: boolean;
}

interface SettingsContextType {
    settings: AppSettings;
    updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
    resetSettings: () => void;
    exportSettings: () => string;
    importSettings: (settingsData: string) => boolean;
}

const defaultSettings: AppSettings = {
    language: 'english',
    theme: 'light',
    soundEffects: true,
    showTargets: true,
    autoAdvance: false,
    fontSize: 'medium',
    fontFamily: 'mono',
    keyboardLayout: 'qwerty',
    practiceMode: 'sentences',
    difficultyLevel: 'beginner',
    showKeyboard: false,
    highlightErrors: true,
    pauseOnError: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);

    useEffect(() => {
        const loadedSettings = loadSettings();
        setSettings({ ...defaultSettings, ...loadedSettings });
    }, []);

    const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        saveSettings(newSettings);
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        saveSettings(defaultSettings);
    };

    const exportSettings = (): string => {
        return JSON.stringify(settings, null, 2);
    };

    const importSettings = (settingsData: string): boolean => {
        try {
            const importedSettings = JSON.parse(settingsData);

            // Validate and merge settings with defaults
            const validatedSettings: AppSettings = {
                language: importedSettings.language === 'bengali' ? 'bengali' : 'english',
                theme: importedSettings.theme === 'dark' ? 'dark' : 'light',
                soundEffects:
                    typeof importedSettings.soundEffects === 'boolean'
                        ? importedSettings.soundEffects
                        : defaultSettings.soundEffects,
                showTargets:
                    typeof importedSettings.showTargets === 'boolean'
                        ? importedSettings.showTargets
                        : defaultSettings.showTargets,
                autoAdvance:
                    typeof importedSettings.autoAdvance === 'boolean'
                        ? importedSettings.autoAdvance
                        : defaultSettings.autoAdvance,
                fontSize: ['small', 'medium', 'large'].includes(importedSettings.fontSize)
                    ? importedSettings.fontSize
                    : defaultSettings.fontSize,
                fontFamily: ['mono', 'sans', 'serif'].includes(importedSettings.fontFamily)
                    ? importedSettings.fontFamily
                    : defaultSettings.fontFamily,
                keyboardLayout: ['qwerty', 'dvorak', 'colemak'].includes(importedSettings.keyboardLayout)
                    ? importedSettings.keyboardLayout
                    : defaultSettings.keyboardLayout,
                practiceMode: ['words', 'sentences', 'paragraphs'].includes(importedSettings.practiceMode)
                    ? importedSettings.practiceMode
                    : defaultSettings.practiceMode,
                difficultyLevel: ['beginner', 'intermediate', 'advanced'].includes(importedSettings.difficultyLevel)
                    ? importedSettings.difficultyLevel
                    : defaultSettings.difficultyLevel,
                showKeyboard:
                    typeof importedSettings.showKeyboard === 'boolean'
                        ? importedSettings.showKeyboard
                        : defaultSettings.showKeyboard,
                highlightErrors:
                    typeof importedSettings.highlightErrors === 'boolean'
                        ? importedSettings.highlightErrors
                        : defaultSettings.highlightErrors,
                pauseOnError:
                    typeof importedSettings.pauseOnError === 'boolean'
                        ? importedSettings.pauseOnError
                        : defaultSettings.pauseOnError,
            };

            setSettings(validatedSettings);
            saveSettings(validatedSettings);
            return true;
        } catch (error) {
            console.error('Failed to import settings:', error);
            return false;
        }
    };

    const value: SettingsContextType = {
        settings,
        updateSetting,
        resetSettings,
        exportSettings,
        importSettings,
    };

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
