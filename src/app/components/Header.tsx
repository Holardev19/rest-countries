import React from 'react';
import ThemeToggle from './theme-toggle';

export default function Header() {
    return (
        <>
            <div className="w-full flex justify-between items-center h-20 shrink-0  px-4 dark:bg-[#2b3844] shadow-custom ">
                <p className="text-[#111517]  text-sm font-extrabold leading-5 dark:text-[#fff]">
                    Where in the world?
                </p>

                <ThemeToggle />
            </div>
        </>
    );
}
