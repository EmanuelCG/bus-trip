import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { updateBus } from '../../api/busApi';

export function DataTableBus({ data, onEdit, onDelete, setBus }) {

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
            console.log("Error updating the status!", error)
        }
    }

    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="relative overflow-x-auto">
            <table className="table-auto min-w-full text-center">
                <thead className="text-xs uppercase border-b border-neutral-200 bg-white font-thin">
                    <tr>
                        <th scope="col" className="px-1 py-4">ID</th>
                        <th scope="col" className="px-1 py-4">PLATE</th>
                        <th scope="col" className="px-1 py-4">COLOR</th>
                        <th scope="col" className="px-1 py-4">BRAND</th>
                        <th scope="col" className="px-1 py-4">MODEL</th>
                        <th scope="col" className="px-1 py-4">SERIAL</th>
                        <th scope="col" className="px-1 py-4">YEAR</th>
                        <th scope="col" className="px-1 py-4">IS ACTIVE</th>
                        <th scope="col" className="px-1 py-4">UPDATED AT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(bus => (
                            <tr key={bus.plate} className='border-b border-neutral-200 odd:bg-white even:bg-slate-200 align-middle'>
                                {
                                    columns.map(column => (
                                        <td key={column} className="whitespace-nowrap px-6 py-4 align-middle">
                                            {column === 'is_active' ? (
                                                <form action="">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value=""
                                                            className="sr-only peer"
                                                            checked={bus.is_active}
                                                            onChange={() => handleToggle(bus.id, bus.is_active)}
                                                        />
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </form>
                                            ) : (bus[column])
                                            }
                                        </td>
                                    ))
                                }
                                <td><button href="" type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onEdit(bus)}><PencilSquareIcon className='size-4 text-white' /></button></td>
                                <td><button href="" type="button" className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block transition-colors align-middle' onClick={() => onDelete(bus.id)}><TrashIcon className='size-4 text-white mx-auto align-middle' /></button></td>


                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}