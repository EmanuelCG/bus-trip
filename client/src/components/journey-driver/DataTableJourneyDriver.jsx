import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";


export function DataTableJourneyDriver({ data, onEdit, onDelete }) {


    return (
        <div className="relative overflow-x-auto">
            <table className="min-w-full text-center table-auto">
                <thead className="text-xs font-thin uppercase bg-white border-b border-neutral-200">
                    <tr>
                        <th scope="col" className="px-1 py-4">ID</th>
                        <th scope="col" className="px-1 py-4">DEPARTURE TIME</th>
                        <th scope="col" className="px-1 py-4">STATE</th>
                        <th scope="col" className="px-1 py-4">JOURNEY</th>
                        <th scope="col" className="px-1 py-4">DRIVER</th>
                        <th scope="col" className="px-1 py-4">UPDATE DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(obj => (
                            <tr key={obj.id} className='align-middle border-b border-neutral-200 odd:bg-white even:bg-slate-200'>


                                <td className="px-6 py-4 align-middle whitespace-nowrap">{obj.id}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{obj.formatted_datetime_start}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{obj.state}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{obj.journey_description}</td>
                                <td data-tooltip-id="driver-tooltip" className="px-6 py-4 align-middle whitespace-nowrap">{obj.driver_document}</td>
                                <td className="px-6 py-4 align-middle whitespace-nowrap">{obj.formatted_update_at}</td>
                                <td><button href="" type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onEdit(obj)}><PencilSquareIcon className='text-white size-4' /></button></td>
                                <td><button href="" type="button" className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onDelete(obj.id)}><TrashIcon className='mx-auto text-white align-middle size-4' /></button></td>


                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}