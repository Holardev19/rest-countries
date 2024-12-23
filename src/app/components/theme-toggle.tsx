'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Light from '@/app/public/bx-sun.svg';
import Dark from '@/app/public/bx-moon.svg';

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const userPreference = localStorage.getItem('theme');
        const systemPreference = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        if (
            userPreference === 'dark' ||
            (!userPreference && systemPreference)
        ) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2"
        >
            <Image
                src={isDarkMode ? Light : Dark}
                alt={isDarkMode ? 'Light mode' : 'Dark mode'}
                width={16}
                height={16}
                className="text-white"
            />

            <p
                className={`text-[#11157] text-xs font-semibold leading-normal ${
                    isDarkMode ? 'text-[#fff]' : 'text-[#111517]'
                }`}
            >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </p>
        </button>
    );
}
