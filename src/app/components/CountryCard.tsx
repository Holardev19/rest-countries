import React from 'react';
import Image from 'next/image';

interface CountryCardProps {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
}

export default function CountryCard({
    name,
    population,
    region,
    capital,
    flag,
}: CountryCardProps) {
    return (
        <>
            <div className="w-full flex flex-col justify-start items-center">
                <div className="w-[264px] h-[336px] shrink-0 flex flex-col justify-start items-center rounded bg-[#fff] dark:bg-[#2b3844]">
                    <div className="w-full h-[160px] shrink-0">
                        <Image
                            src={flag}
                            alt={`${name} fleg`}
                            width={250}
                            height={160}
                            className="w-full h-[160px]"
                        />
                    </div>

                    {/* Details about country */}
                    <div className="w-full pl-6 flex flex-col items-start justify-start mt-6">
                        <p className="text-[#111517] text-lg font-extrabold leading-6 dark:text-[#fff]">
                            {name}
                        </p>

                        <div className="w-full flex flex-col items-start gap-2 mt-4">
                            <p className="text-[#111517] text-sm font-semibold leading-4 dark:text-[#fff]">
                                Population:{' '}
                                <span className="text-[#111517] text-sm font-light leading-4 dark:text-[#fff]">
                                    {population.toLocaleString()}
                                </span>
                            </p>

                            <p className="text-[#111517] text-sm font-semibold leading-4 dark:text-[#fff]">
                                Region:{' '}
                                <span className="text-[#111517] text-sm font-light leading-4 dark:text-[#fff]">
                                    {region}
                                </span>
                            </p>

                            <p className="text-[#111517] text-sm font-semibold leading-4 dark:text-[#fff]">
                                Capital:{' '}
                                <span className="text-[#111517] text-sm font-light leading-4 dark:text-[#fff]">
                                    {capital}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
