import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { updateBus } from '../../api/busApi';
import { useState } from 'react';
import DataTable from 'react-data-table-component';

export function DataTableBus({ data, onEdit, onDelete, setBus }) {

    const [errorMessage, setErrorMessage] = useState('');
    const [search, setSearch] = useState('')
    const [filterText, setFilterText] = useState('');
    const [hidden, setHidden] = useState('')

    const handleToggle = async (busId, isActive) => {
        const newStatus = !isActive;

        try {
            const response = await updateBus(busId, { is_active: newStatus })
            if (response.status === 200) {
                const updatedData = data.map(bus => bus.id === busId ? { ...bus, is_active: newStatus } : bus);
                setBus(updatedData)
            } else {
                console.log("Failed to update status");
            }
        } catch (error) {
            setErrorMessage("Error updating the status!")
        }
    }

    const handleSearch = () => {
        setFilterText(search)
        setHidden('hidden')
    }

    const handleClearSearch = () => {
        setFilterText("");
        setSearch('')
        setHidden('')
    };

    const filteredData = data.filter(driver => {
        return (
            driver.plate?.toLowerCase().includes(filterText.toLowerCase()) ||
            driver.serial?.toLowerCase().includes(filterText.toLowerCase()) ||
            driver.brand?.toLowerCase().includes(filterText.toLowerCase()) ||
            driver.model?.toLowerCase().includes(filterText.toLowerCase()) ||
            driver.year?.toLowerCase().includes(filterText.toLowerCase())

        )
    });


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            maxWidth: '20px',
            compact: true
        },
        {
            name: 'PLATE',
            selector: row => row.plate,
            sortable: true,
            compact: true
        },
        {
            name: 'COLOR',
            selector: row => row.color,
            sortable: true,
            compact: true
        },
        {
            name: 'BRNAD',
            selector: row => row.brand,
            sortable: true,
            compact: true
        },
        {
            name: 'MODEL',
            selector: row => row.model,
            sortable: true,
            compact: true

        },
        {
            name: 'SERIAL',
            selector: row => row.serial,
            sortable: true,
            compact: true

        },
        {
            name: 'YEAR',
            selector: row => row.year,
            sortable: true,
            compact: true

        },
        {
            name: 'IS ACTIVE',
            selector: row => row.is_active,
            sortable: false,
            maxWidth: '20px',
            compact: true,
            cell: row => (
                <form action="">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={row.is_active}
                            onChange={() => handleToggle(row.id, row.is_active)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </form>
            )
        },
        {
            name: 'LAST UPDATE',
            selector: row => row.formatted_update_at,
            sortable: true,
            compact: true
        },
        {
            name: '',
            compact: true,
            cell: row => (
                <div className="flex">
                    <button href="" type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onEdit(row)}><PencilSquareIcon className='text-white size-4' /></button>

                </div>
            ),
            ignoreRowClick: true,
        },
        {
            name: '',
            compact: true,
            cell: row => (
                <div className="flex">
                    <button href="" type="button" className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onDelete(row.id)}><TrashIcon className='mx-auto text-white align-middle size-4' /></button>
                </div>
            ),
            ignoreRowClick: true,
        }
    ]


    return (
        <div className="relative col-span-2 py-2 overflow-x-auto">
            {errorMessage}
            <div className="block max-w-md mb-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:border-blue-400 focus:outline-none focus:ring-0" placeholder="Search driver" required onChange={e => setSearch(e.target.value)} value={search} />
                    <button type="submit" className={`text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${hidden}`} onClick={handleSearch}>Search</button>

                    {
                        filterText && (
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClearSearch}>Clear search</button>
                        )
                    }
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                pagination={true}
                highlightOnHover
                pointerOnHover
                customStyles={{
                    table: {
                        style: {
                            minWidth: '100%',
                        },
                    },
                    rows: {
                        style: {
                            paddingTop: '5px',
                            paddingBottom: '5px',
                        },
                    },
                    headCells: {
                        style: {
                            backgroundColor: '#FFFFFF', // equivalent to 'bg-white'
                            borderBottom: '1px solid #E5E7EB', // equivalent to 'border-b border-neutral-200'
                            textTransform: 'uppercase', // equivalent to 'uppercase'
                            fontWeight: '500', // equivalent to 'font-thin'
                            fontSize: '0.75rem', // equivalent to 'text-xs'
                            paddingTop: '16px', // equivalent to 'py-4'
                            paddingBottom: '16px', // equivalent to 'py-4'
                        },
                    },
                    cells: {
                        style: {
                            paddingTop: '16px', // equivalent to 'py-4'
                            paddingBottom: '16px', // equivalent to 'py-4'
                            whiteSpace: 'nowrap', // equivalent to 'whitespace-nowrap'
                        },

                    },

                }}
            />
        </div>
    );
}