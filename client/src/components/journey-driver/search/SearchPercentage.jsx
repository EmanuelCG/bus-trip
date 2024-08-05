import { useState } from "react";
import JourneyDropdown from "../selector/JourneyDropdown";

export default function SearchPercentage({ setFilterPercentage, setSelectedJourney }) {
    const [search, setSearch] = useState('');
    const [value, setValue] = useState(0);
    const [journey, setJourney] = useState('');

    const handleSearch = () => {
        setFilterPercentage(parseFloat(value) || '');
        setSelectedJourney(journey);
        console.log(journey)
        console.log(value)
    };

    const handlePercentageChange = (event) => {
        setValue(parseFloat(event.target.value) || 0);
    };

    const handleClearSearch = () => {
        setSearch('');
        setValue(0);
        setJourney('');
        setFilterPercentage('');
        setSelectedJourney('');
    };

    const handleIncrement = () => {
        setValue(prev => prev + 10.00);
    };


    const handleDecrement = () => {
        setValue(prev => (prev > 0 ? prev - 10.00 : 0));
    };

    return (
        <form className="grid grid-cols-6 gap-4 mb-5">
            <div className="col-span-4 md:col-span-2">
                <JourneyDropdown selectedJourney={journey} setSelectedJourney={setJourney} />
            </div>
            <div className="col-span-4 md:col-span-2">
                <label htmlFor="bedrooms-input" className="mb-2 text-sm font-medium text-gray-700">
                    Select % of sold capacity
                </label>
                <div className="flex items-center w-[50%]">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        className="h-12 p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        id="bedrooms-input"
                        aria-describedby="helper-text-explanation"
                        className="block w-full h-12 text-sm font-medium text-center text-gray-900 border-gray-300 bg-gray-50 border-x-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={`${value + ".00"} %`} onChange={handlePercentageChange}
                        readOnly
                    />
                    <div className="absolute flex items-center space-x-1 text-xs text-gray-400 -translate-x-1/2 bottom-1 start-1/2 rtl:translate-x-1/2 rtl:space-x-reverse">
                        {/* <svg className="w-2.5 h-2.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9" />
                        </svg>
                        <span>Capacity</span> */}
                    </div>
                    <button
                        type="button"
                        onClick={handleIncrement}
                        className="h-12 p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex items-end col-span-2 md:col-span-2">
                <button type="button" className="h-12 relative w-[50%] mb-0.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 mr-1" onClick={handleSearch}>Search</button>
                {(search || value || journey) && (
                    <button type="button" className="h-12 block w-[50%] mb-0.5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3" onClick={handleClearSearch}>Clear search</button>
                )}
            </div>
        </form>
    );
}