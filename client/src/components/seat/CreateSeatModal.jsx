import { useForm } from 'react-hook-form'
import { createSeat } from '../../api/seatApi'
import { getAllBus } from '../../api/busApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react';

export default function CreatePassengerModal({ isOpen, onClose, setSeat, seats }) {

    const [buses, setBuses] = useState([])

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { seat_number: '', bus: '', status: true }
    });

    useEffect(() => {

        async function loadBuses() {
            const buses = await getAllBus()
            setBuses(buses.data)
        }

        loadBuses()
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const res = await createSeat(data);
        if (res.status === 201) {
            setSeat([...seats, res.data])
        }

        toast.success('¡Seat created succesfully!', { theme: "colored", position: "top-center" });
        reset();
        onClose();
    });

    if (!isOpen) return null;

    return (
        // {/* <!-- Main modal --> */}
        <div id="create-bus-modal" tabIndex="-1" aria-hidden="true" className="fixed left-0 right-0 z-50 flex justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 top-20 md:inset-0">
            <div className="relative w-full max-w-3xl max-h-full p-4 mt-20">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow ">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 ">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Register Seat
                        </h3>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto" data-modal-toggle="create-bus-modal" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form className="p-4 md:p-5" onSubmit={onSubmit} >
                        <div className="grid grid-cols-8 gap-4 mb-4">
                            <div className="col-span-4">
                                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900">Seat number</label>
                                <input type="text" name="document" id="plate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Seat number" required="" {...register("seat_number", { required: true })} />
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900">Bus</label>
                                <select {...register('bus', { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="" disabled>Choose a bus</option>
                                    {
                                        buses.map(bus => (
                                            <option key={bus.id} value={bus.id}>{bus.plate}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Save Seat
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}