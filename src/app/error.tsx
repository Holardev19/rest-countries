'use client';
import { useEffect } from 'react';

import React from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold dark:text-[#fff] text-[#111517]">
                    Something went wrong!
                </h1>
                <p className="text-base dark:text-[#fff] text-[#111517]">
                    No results found
                </p>
                <button
                    onClick={() => reset()}
                    className="mt-4 px-4 py-2 dark:bg-[#fff] bg-[#111517] dark:text-[#fff] text-[#fff] rounded"
                >
                    Retry
                </button>
            </div>
        </>
    );
}
