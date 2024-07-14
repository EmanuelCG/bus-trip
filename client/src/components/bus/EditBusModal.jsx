import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { updateBus } from '../../api/busApi';
import { toast } from 'react-toastify';

export default function EditBusModal({ isOpen, onClose, setBus, currentBus, buses }) {

    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: { plate: '', color: '', brand: '', model: '', serial: '', year: '' }
    })
    useEffect(() => {
        if (currentBus) {
            setValue('plate', currentBus.plate);
            setValue('color', currentBus.color);
            setValue('brand', currentBus.brand);
            setValue('model', currentBus.model);
            setValue('serial', currentBus.serial);
            setValue('year', currentBus.year);
        }
    }, [currentBus, setValue])

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const res = await updateBus(currentBus.id, data)
        if (res.status === 200) {
            setBus(buses.map(bus => (bus.id === currentBus.id ? res.data : bus)));
        }
        toast.info('¡Edición completa!', { theme: "colored", position: "top-center" });
        reset();
        onClose();
    })

    if (!isOpen) return null;

    return (
        // {/* <!-- Main modal --> */}
        <div id="edit-bus-modal" tabIndex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-gray-900 bg-opacity-50 h-full">
            <div className="relative p-4 w-full max-w-3xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Editar Bus
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="edit-bus-modal" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form className="p-4 md:p-5" onSubmit={onSubmit} >
                        <div className="grid gap-4 mb-4 grid-cols-8">
                            <div className="col-span-4">
                                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plate</label>
                                <input type="text" name="plate" id="plate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" {...register("plate", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                <input type="text" name="color" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Color" required="" {...register("color", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 grid-cols-8">
                            <div className="col-span-4">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Brand" required="" {...register("brand", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                                <input type="text" name="model" id="model" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Model" required="" {...register("model", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 grid-cols-8">
                            <div className="col-span-4">
                                <label htmlFor="serial" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial</label>
                                <input type="text" name="serial" id="serial" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Serial" required="" {...register("serial", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                                <input type="text" name="year" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Year" required="" {...register("year", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}