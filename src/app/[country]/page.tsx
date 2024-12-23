import Image from 'next/image';
import BackButton from '../components/BackButton';

async function getCountryData(codeOrName: string) {
    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${codeOrName}?fields=name,capital,region,subregion,population,languages,currencies,flags,demonym`
        );

        if (!res.ok) {
            console.error(`API request failed with status: ${res.status}`);
            throw new Error('Failed to fetch country details');
        }

        return res.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching country data:', error.message);
            throw error;
        } else {
            console.error('An unknown error occurred:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

interface CountryDetailsProps {
    params: Promise<{
        country: string;
    }>;
}

export default async function CountryDetails({ params }: CountryDetailsProps) {
    const { country } = await params; // Await params before destructuring

    const countryData = await getCountryData(country);

    try {
        if (!countryData) {
            return (
                <div className="text-center mt-8">
                    <p className="text-red-500">Country not found</p>
                </div>
            );
        }

        const {
            name,
            capital,
            region,
            subregion,
            population,
            languages,
            currencies,
            flags,
            demonym,
        } = countryData;

        const languageList = languages
            ? Object.values(languages).join(', ')
            : 'N/A';
        const currencyList = currencies
            ? Object.values(currencies as Record<string, { name: string }>)
                  .map((currency) => currency.name)
                  .join(', ')
            : 'N/A';

        return (
            <div className="flex flex-col w-full h-screen px-7 items-start justify-start bg-[#fafafa]">
                <BackButton />

                <div className="flex items-center justify-start w-full h-auto mt-[70px]">
                    <Image
                        src={flags.svg}
                        alt={`Flag of ${name.common} flag`}
                        width={319}
                        height={250}
                    />
                </div>

                <div>
                    <p className="dark:text-[#fff] text-[#111517] text-[22px] font-extrabold leading-normal mt-6">
                        {name.common}
                    </p>

                    <div className="mt-4 flex flex-col items-start justify-start w-full">
                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Native name: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {name.common}
                                {/* You might want to use a native name */}
                            </span>
                        </p>

                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Population: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {population.toLocaleString()}
                            </span>
                        </p>

                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Region: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {region}
                            </span>
                        </p>

                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Sub Region: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {subregion}
                            </span>
                        </p>

                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Capital: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {capital ? capital[0] : 'N/A'}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mt-4 flex flex-col items-start justify-start w-full">
                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Currencies: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {currencyList}
                            </span>
                        </p>

                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Demonym: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {demonym || 'N/A'}
                            </span>
                        </p>

                        <p className="dark:text-[#fff] text-[#111517] text-sm font-semibold leading-8">
                            Languages: &nbsp;
                            <span className="dark:text-[#fff] text-[#111517] text-sm font-light leading-8">
                                {languageList}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch {
        return (
            <div className="text-center mt-8">
                <p className="text-red-500">
                    An error occurred while fetching data
                </p>
            </div>
        );
    }
}
