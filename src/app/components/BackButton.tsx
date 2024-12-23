'use client';

import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton() {
    const handleBack = () => {
        history.back(); // Navigate back
    };

    return (
        <button
            onClick={handleBack}
            className="w-[104px] h-8 shrink-0 rounded-[2px] dark:bg-[#2b3844] flex items-center justify-center shadow-md bg-[#fff] mt-10 gap-2"
        >
            <FiArrowLeft className="text-lg dark:text-white text-[#111517]" />

            <p className="dark:text-[#fff] text-[#111517] text-sm font-light leading-5">
                Back
            </p>
        </button>
    );
}
