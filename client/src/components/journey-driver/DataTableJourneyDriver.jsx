import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import DetailJourneyModal from "./DetailJourneyModal";
import DetailDriverModal from "./DetailDriverModal";
import SearchDefault from "../common/SearchDefault";
import DataTable from "react-data-table-component";


export function DataTableJourneyDriver({ data, onEdit, onDelete }) {

    const [openJourneyModal, setOpenJourneyModal] = useState(false);
    const [openDriverModal, setOpenDriverModal] = useState(false);
    const [journey, setJouney] = useState(null);
    const [driver, setDriver] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const [filterText, setFilterText] = useState('');
    const filteredData = data.filter(obj => {
        return (
            obj.journey_description?.toLowerCase().includes(filterText.toLowerCase())

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
            name: 'NAME',
            selector: row => row.formatted_datetime_start,
            sortable: true,
            compact: true
        },
        {
            name: 'STATUS',
            selector: row => row.state,
            sortable: false,
            maxWidth: '20px',
            compact: true,

        },
        {
            name: 'JOURNEY',
            selector: row => row.journey,
            sortable: false,
            compact: true,
            cell: row => (
                <button onClick={(e) => handleOpenModalJourney(row.journey, e)} type="button" className="px-2 py-2 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 me-1" data-modal-toggle="crypto-modal" ref={buttonRef}>
                    <span className="">{row.journey_description}</span>
                </button>
            )

        },
        {
            name: 'DRIVER',
            selector: row => row.driver,
            sortable: false,
            compact: true,
            cell: row => (
                <button onClick={(e) => handleOpenModalDriver(row.driver, e)} type="button" className="px-2 py-2 mb-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 me-1" data-modal-toggle="crypto-modal">
                    <span className="">{row.driver_document}</span>
                </button>
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


    const handleOpenModalJourney = (id, event) => {
        const buttonRect = event.target.getBoundingClientRect();
        setModalPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX,
        });
        setJouney(id);
        setOpenJourneyModal(true);
    };

    const handleOpenModalDriver = (id, event) => {
        const buttonRect = event.target.getBoundingClientRect();
        setModalPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX,
        });
        setDriver(id);
        setOpenDriverModal(true);
    };

    return (
        <div className="relative col-span-2 py-2 overflow-x-auto">
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
            <DetailJourneyModal setOpen={setOpenJourneyModal} open={openJourneyModal} journey={journey} position={modalPosition} />
            <DetailDriverModal setOpen={setOpenDriverModal} open={openDriverModal} driver={driver} position={modalPosition} />

        </div>
    )
}