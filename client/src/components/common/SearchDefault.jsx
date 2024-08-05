import { useState } from "react";

export default function SearchDefault({ filterText, setFilterText }) {

    const [search, setSearch] = useState('')
    const [searchClicked, setSearchClicked] = useState(false);


    const handleSearch = () => {

        if (search.trim() !== '') {
            setFilterText(search)
            setSearchClicked(true);
        }
    }

    const handleClearSearch = () => {
        setFilterText('');
        setSearch('')
        setSearchClicked(false);
    };

    return (
        <div className="block max-w-md mb-4">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:border-blue-400 focus:outline-none focus:ring-0" placeholder="Search driver" required onChange={e => setSearch(e.target.value)} value={search} />
                <button type="submit" className={`text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${searchClicked ? 'hidden' : ''}`} onClick={handleSearch}>Search</button>

                {
                    filterText && (
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClearSearch}>Clear search</button>
                    )
                }
            </div>
        </div>
    )

}