import { useState } from "react";
import { updateLocation } from "../../api/locationApi"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export function DataTableJourney({ data, onEdit, onDelete, setJourneys }) {

    const [errorMessage, setErrorMessage] = useState('');

    const handleToggle = async (journeyId, isActive) => {
        const newStatus = !isActive
        try {
            const response = await updateLocation(journeyId, { is_active: newStatus })
            if (response.status === 200) {
                const updateData = data.map(journey => journey.id === journeyId ? { ...journey, is_active: newStatus } : journey)
                setJourneys(updateData)
            }
        } catch (error) {
            setErrorMessage('There was an error updating the status. Please try again.')
        }
    }

    return (
        <div className="relative overflow-x-auto">
            {errorMessage && <div className="text-red-600 error-message">{errorMessage}</div>}
            <table className="min-w-full text-center table-auto">
                <thead className="text-xs font-thin uppercase bg-white border-b border-neutral-200">
                    <tr>
                        <th scope="col" className="px-1 py-4">ID</th>
                        <th scope="col" className="px-1 py-4">TRAVEL TIME</th>
                        <th scope="col" className="px-1 py-4">ORIGIN LOCATION</th>
                        <th scope="col" className="px-1 py-4">DESTINATION LOCATION</th>
                        <th scope="col" className="px-1 py-4">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(journey => (
                            <tr key={journey.id} className='align-middle border-b border-neutral-200 odd:bg-white even:bg-slate-200'>


                                <td className="px-6 py-4 align-middle whitespace-nowrap">{journey.id}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{journey.duration_in_seconds}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{journey.location_origin_name}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{journey.location_destination_name}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">
                                    <form action="">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="sr-only peer"
                                                checked={journey.is_active}
                                                onChange={() => handleToggle(journey.id, journey.is_active)}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </form>
                                </td>

                                <td><button href="" type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onEdit(journey)}><PencilSquareIcon className='text-white size-4' /></button></td>
                                <td><button href="" type="button" className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onDelete(journey.id)}><TrashIcon className='mx-auto text-white align-middle size-4' /></button></td>


                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}