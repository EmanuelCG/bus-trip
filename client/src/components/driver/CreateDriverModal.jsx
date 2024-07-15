import Datepicker from "react-tailwindcss-datepicker"
import { useForm } from 'react-hook-form'
import { createDriver } from '../../api/driverApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import BusSelect from "./select/BusSelect"
import { handleFetchAllBuses } from "../../helpers/formHandlers"


export default function CreateDriverModal({ isOpen, onClose, setDrivers, drivers }) {
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: { document: '', names: '', last_names: '', date_of_birthday: '', bus: '' }
    });

    const [buses, setBuses] = useState([])

    useEffect(() => {
        async function loadBuses() {
            try {
                const data = await handleFetchAllBuses();
                setBuses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setBuses([]);
            }
        }
        loadBuses()
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        data.date_of_birthday = valueDatepicker.startDate;
        data.bus = data.bus.value
        console.log(data)
        const res = await createDriver(data);
        if (res.status === 201) {
            setDrivers([...drivers, res.data])
        }

        toast.success('Driver created succesfully!', { theme: "colored", position: "top-center" });
        reset();
        onClose();
    });

    const [valueDatepicker, setValueDatepicker] = useState({ startDate: null });

    const handleValueChange = (newValue) => {
        setValueDatepicker(newValue);
    }

    if (!isOpen) return null;

    return (
        // {/* <!-- Main modal --> */}
        <div id="create-driver-modal" tabIndex="-1" aria-hidden="true" className="fixed left-0 right-0 z-50 flex justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 top-20 md:inset-0">
            <div className="relative w-full max-w-3xl max-h-full p-4 mt-20">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow ">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 ">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Register Driver
                        </h3>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto" data-modal-toggle="create-driver-modal" onClick={onClose}>
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
                                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900">Document</label>
                                <input type="text" name="document" id="plate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="document" required="" {...register("document", { required: true })} />
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">Names</label>
                                <input type="text" name="names" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="names" required="" {...register("names", { required: true })} />
                            </div>

                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">

                            <div className="col-span-4">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last names</label>
                                <input type="text" name="lastnames" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="last names" required="" {...register("last_names", { required: true })} />
                            </div>

                            <div className="col-span-4">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={valueDatepicker}
                                    onChange={handleValueChange}
                                    inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 relative w-full p-2.5"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">
                            <div className="col-span-8">
                                <BusSelect control={control} name="bus" buses={buses} />
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Save Driver
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}