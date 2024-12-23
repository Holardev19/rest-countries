import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <FaSpinner className="animate-spin dark:text-white text-4xl text-[#111517]" />

                <p className="ml-4 text-xl font-semibold">Loading...</p>
            </div>
        </>
    );
}
