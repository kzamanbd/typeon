import type { Lesson } from '../types';

export const englishLessons: Lesson[] = [
    // Beginner English Lessons
    {
        id: 'en-bg-01',
        title: 'Home Row Keys',
        language: 'english',
        level: 'beginner',
        content: 'asdf jkl; asdf jkl; sad ask fad lad jad kas fall asks salad',
        targetWPM: 15,
        minAccuracy: 90,
        isLocked: false,
        order: 1,
    },
    {
        id: 'en-bg-02',
        title: 'Top Row Introduction',
        language: 'english',
        level: 'beginner',
        content: 'qwer tyui qwer tyui quit wet yet toy try wit queen write true',
        targetWPM: 20,
        minAccuracy: 85,
        isLocked: false,
        order: 2,
    },
    {
        id: 'en-bg-03',
        title: 'Bottom Row Practice',
        language: 'english',
        level: 'beginner',
        content: 'zxcv bnm, zxcv bnm, zinc cave move come zoom cabin mix buzz',
        targetWPM: 18,
        minAccuracy: 85,
        isLocked: false,
        order: 3,
    },
    {
        id: 'en-bg-04',
        title: 'Simple Words',
        language: 'english',
        level: 'beginner',
        content: 'the and for are but not you all can had her was one our out day get has him',
        targetWPM: 25,
        minAccuracy: 90,
        isLocked: false,
        order: 4,
    },

    // Intermediate English Lessons
    {
        id: 'en-int-01',
        title: 'Common Phrases',
        language: 'english',
        level: 'intermediate',
        content: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
        targetWPM: 35,
        minAccuracy: 92,
        isLocked: false,
        order: 5,
    },
    {
        id: 'en-int-02',
        title: 'Numbers and Symbols',
        language: 'english',
        level: 'intermediate',
        content: 'Type these: 123 456 789 0. Use symbols: !@#$%^&*() The price is $29.99 today!',
        targetWPM: 30,
        minAccuracy: 88,
        isLocked: false,
        order: 6,
    },
    {
        id: 'en-int-03',
        title: 'Mixed Case Practice',
        language: 'english',
        level: 'intermediate',
        content: 'Practice Mixed Case Typing. This Sentence Has Capital Letters Throughout The Text.',
        targetWPM: 40,
        minAccuracy: 90,
        isLocked: false,
        order: 7,
    },

    // Advanced English Lessons
    {
        id: 'en-adv-01',
        title: 'Technical Terminology',
        language: 'english',
        level: 'advanced',
        content:
            'JavaScript programming involves arrays, objects, functions, and asynchronous operations with promises.',
        targetWPM: 50,
        minAccuracy: 95,
        isLocked: false,
        order: 8,
    },
    {
        id: 'en-adv-02',
        title: 'Complex Punctuation',
        language: 'english',
        level: 'advanced',
        content: 'Consider this: "What if we could achieve 95% accuracy?" she asked. The answer wasn\'t clear—yet.',
        targetWPM: 45,
        minAccuracy: 93,
        isLocked: false,
        order: 9,
    },
];

export const bengaliLessons: Lesson[] = [
    // Beginner Bengali Lessons
    {
        id: 'bn-bg-01',
        title: 'বাংলা স্বরবর্ণ',
        language: 'bengali',
        level: 'beginner',
        content: 'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ',
        targetWPM: 10,
        minAccuracy: 85,
        isLocked: false,
        order: 1,
    },
    {
        id: 'bn-bg-02',
        title: 'সাধারণ শব্দ',
        language: 'bengali',
        level: 'beginner',
        content: 'আমি তুমি তিনি আমরা তোমরা তারা ভাল মন্দ দিন রাত',
        targetWPM: 15,
        minAccuracy: 85,
        isLocked: false,
        order: 2,
    },
    {
        id: 'bn-bg-03',
        title: 'সহজ বাক্য',
        language: 'bengali',
        level: 'beginner',
        content: 'আমি ভাত খাই। তুমি পানি খাও। আকাশ নীল। ফুল সুন্দর।',
        targetWPM: 20,
        minAccuracy: 88,
        isLocked: false,
        order: 3,
    },

    // Intermediate Bengali Lessons
    {
        id: 'bn-int-01',
        title: 'যুক্তাক্ষর অনুশীলন',
        language: 'bengali',
        level: 'intermediate',
        content: 'ক্ক ক্ত ক্ম ক্র ক্ল ক্ষ গ্ন গ্ম গ্র ঙ্ক ঙ্গ চ্চ চ্ছ জ্জ জ্ঞ',
        targetWPM: 25,
        minAccuracy: 90,
        isLocked: false,
        order: 4,
    },
    {
        id: 'bn-int-02',
        title: 'জটিল বাক্য',
        language: 'bengali',
        level: 'intermediate',
        content: 'শিক্ষা জাতির মেরুদণ্ড। জ্ঞানই শক্তি। পরিশ্রম সৌভাগ্যের প্রসূতি।',
        targetWPM: 30,
        minAccuracy: 92,
        isLocked: false,
        order: 5,
    },

    // Advanced Bengali Lessons
    {
        id: 'bn-adv-01',
        title: 'সাহিত্যিক গদ্য',
        language: 'bengali',
        level: 'advanced',
        content: 'রবীন্দ্রনাথ ঠাকুর বাংলা সাহিত্যের অমর কবি। তাঁর রচনা বিশ্বসাহিত্যে স্থান করে নিয়েছে।',
        targetWPM: 35,
        minAccuracy: 95,
        isLocked: false,
        order: 6,
    },
];

export const allLessons = [...englishLessons, ...bengaliLessons];

export const getLessonsByLanguage = (language: 'english' | 'bengali') => {
    return allLessons.filter(lesson => lesson.language === language);
};

export const getLessonsByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
    return allLessons.filter(lesson => lesson.level === level);
};

export const getLessonById = (id: string) => {
    return allLessons.find(lesson => lesson.id === id);
};
