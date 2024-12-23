'use client';
import { FaChevronDown } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CountryCard from './components/CountryCard';
import { FaSpinner } from 'react-icons/fa';

interface Country {
    name: { common: string };
    population: number;
    region: string;
    capital?: string[];
    flags: { png: string };
    cca3: string;
}

export default function Home() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const fetchCountries = async (region?: string, search?: string) => {
        setLoading(true);
        try {
            let url = '';

            if (search) {
                url = `https://restcountries.com/v3.1/name/${search.toLowerCase()}`;
            } else if (region) {
                url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
            } else {
                url = `https://restcountries.com/v3.1/alpha?codes=DEU,USA,BRA,ISL,AFG,ALA,ALB,DZA`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok && Array.isArray(data)) {
                setCountries(data);
            } else {
                setCountries([]);
                setError(`No results found for "${search || region}".`);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm) {
            fetchCountries(undefined, searchTerm);
        }
    };

    const handleRegionSelect = (region: string) => {
        setSelectedRegion(region);
        setIsDropdownOpen(false);
        fetchCountries(region);
    };

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen gap-2">
                <FaSpinner className="animate-spin dark:text-white text-4xl text-[#111517]" />
            </div>
        );

    const resetPage = () => {
        setSearchTerm('');
        setSelectedRegion(null);
        setCountries([]);
        setError(null);
        fetchCountries();
    };

    return (
        <>
            {/* Main container */}
            <div className="px-4 bg-[#fafafa] dark:bg-[#202c36] h-screen">
                {/* Container for search and filter */}
                <div className="flex flex-col items-start justify-center gap-10 md:flex-row md:items-center md:justify-between md:pt-12">
                    <div className="w-full h-12 dark:bg-[#2b3844] rounded-[5px] px-[32px] flex items-center justify-center gap-[26px] bg-[#fff] mt-6 md:mt-0 md:w-[480px]">
                        <button className="text-[#111517]">
                            <FaSearch className="text-black dark:text-white h-4 w-4" />
                        </button>

                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full dark:text-[#fff] text-[#111517] text-xs font-normal leading-5 dark:bg-[#2b3844] cursor-text outline-none md:w-[480px]"
                            placeholder="Search for a country…"
                        />
                    </div>

                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="dark:bg-[#2b3844] bg-[#fff] w-[200px] h-12 shrink-0 rounded-[5px] flex items-center justify-between px-6"
                        >
                            <p className="text-[#111517] dark:text-[#fff] text-xs font-normal leading-5">
                                {selectedRegion || 'Filter by Region'}
                            </p>

                            <FaChevronDown className="text-black dark:text-white h-3 w-3" />
                        </button>

                        {isDropdownOpen && (
                            <ul className="absolute top-full left-0 w-full bg-[#fff] dark:bg-[#2b3844] rounded-[5px] mt-2 shadow-lg z-10">
                                {regions.map((region) => (
                                    <li
                                        key={region}
                                        onClick={() =>
                                            handleRegionSelect(region)
                                        }
                                        className="px-6 py-2 cursor-pointer text-[#111517] dark:text-[#fff] hover:bg-gray-200 dark:hover:bg-[#3a4b54]"
                                    >
                                        {region}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className="flex flex-col items-center justify-center text-center mt-8 dark:text-[#fff] text-[#111517] gap-4 ">
                        <p>{error}</p>
                        <button
                            onClick={resetPage}
                            className="px-6 py-2 dark:bg-[#fff] bg-[#111517] dark:text-[#111517] text-[#fff] rounded "
                        >
                            Reload Page
                        </button>
                    </div>
                )}

                {/* List of countries on the landing page */}

                {!error && (
                    <section className="w-full mt-8">
                        <div className="countries-list flex flex-wrap gap-10 justify-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {countries.map((country) => (
                                <Link
                                    className="cursor-pointer"
                                    key={country.cca3}
                                    href={`/${country.cca3}`}
                                >
                                    <CountryCard
                                        name={country.name.common}
                                        population={country.population}
                                        region={country.region}
                                        capital={
                                            country.capital
                                                ? country.capital[0]
                                                : 'N/A'
                                        }
                                        flag={country.flags.png}
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
