import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateLocation } from "../../api/locationApi";
import { toast } from "react-toastify";

export default function EditLocationModal({ isOpenEdit, onCloseEdit, setLocations, locations, currentLocation }) {
    const { register, handleSubmit, reset, setValue } = useForm({
        defaultValues: { name: '' }
    })
    useEffect(() => {
        if (currentLocation) {
            setValue('name', currentLocation.name);
        }
    }, [currentLocation, setValue])

    const onSubmit = handleSubmit(async (data) => {
        const res = await updateLocation(currentLocation.id, data)
        if (res.status === 200) {
            setLocations(locations.map(location => (location.id === currentLocation.id ? res.data : location)));
        }
        toast.info('¡Edición completa!', { theme: "colored", position: "top-center" });
        reset();
        onCloseEdit();
    })

    if (!isOpenEdit) return null;

    return (
        // {/* <!-- Main modal --> */}
        <div id="edit-bus-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 md:inset-0">
            <div className="relative w-full max-w-3xl max-h-full p-4">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Editar location
                        </h3>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="edit-bus-modal" onClick={onCloseEdit}>
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
                                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="" required="" {...register("name", { required: true })} />
                                {/* {errors.marca && <span>this field is required</span>} */}
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            <svg className="w-5 h-5 me-1 -ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}