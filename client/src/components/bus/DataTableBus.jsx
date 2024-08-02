import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { updateBus } from '../../api/busApi';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import SearchDefault from '../common/SearchDefault';

export function DataTableBus({ data, onEdit, onDelete, setBus }) {

    const [errorMessage, setErrorMessage] = useState('');
    const [filterText, setFilterText] = useState('');

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
            <SearchDefault filterText={filterText} setFilterText={setFilterText} />
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