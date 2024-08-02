import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { updateDriver } from "../../api/driverApi"
import { toast } from "react-toastify"
import BusSelector from "./selector/BusSelector"
import { handleFetchAvailableBuses } from "../../helpers/formHandlers"
import CalendarCustom from '../common/CalendarCustom'
import { format } from "date-fns"

export default function EditDriverModal({ isOpen, onClose, drivers, setDrivers, currentDriver }) {
    const { register, handleSubmit, setValue, reset, control } = useForm({
        defaultValues: { document: '', names: '', last_names: '', bus: '' }
    })

    const [buses, setBuses] = useState([]);
    const [startDate, setStartDate] = useState()
    // const dob = currentDriver.date_of_birthday ? new Date(currentDriver.date_of_birthday) : null;

    useEffect(() => {
        async function loadData() {
            const res = await handleFetchAvailableBuses();
            if (currentDriver) {
                setValue('document', currentDriver.document)
                setValue('names', currentDriver.names)
                setValue('last_names', currentDriver.last_names)
                setValue('bus', currentDriver.bus)
                setValue('bus', currentDriver.bus)
                // setValue('date_of_birthday', dob);
                if (currentDriver.date_of_birthday) {
                    const dateOfBirthday = new Date(currentDriver.date_of_birthday);
                    setStartDate(dateOfBirthday);
                } else {
                    reset();
                }

                if (currentDriver.bus) {
                    const currentBus = res.find(bus => bus.id === currentDriver.bus);
                    if (currentBus) {
                        setValue('bus', {
                            value: currentBus.id,
                            label: currentBus.plate,
                            ...currentBus
                        });
                    }
                }
            }

            if (res) {
                setBuses(res)

            } else {
                setBuses([])
            }
        }
        loadData();
    }, [currentDriver, setValue, reset])



    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        data.date_of_birthday = format(startDate, "yyyy-MM-dd");
        data.bus = data.bus.value;
        const res = await updateDriver(currentDriver.id, data)
        if (res.status === 200) {
            setDrivers(drivers.map(driver => (driver.id === currentDriver.id ? res.data : driver)))
            toast.info('The update was done!', { theme: "colored", position: "top-center" });
        }
        reset()
        onClose()

    });



    if (!isOpen) return null

    return (
        // {/* <!-- Main modal --> */}
        <div id="edit-driver-modal" tabIndex="-1" aria-hidden="true" className="fixed left-0 right-0 z-50 flex justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 top-10 md:inset-0">
            <div className="relative w-full max-w-3xl max-h-full p-4 mt-20">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow ">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 ">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Register Driver
                        </h3>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto" data-modal-toggle="edit-driver-modal" onClick={onClose}>
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
                                <CalendarCustom startDate={startDate} setStartDate={setStartDate} />
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">
                            <div className="col-span-8">
                                <BusSelector control={control} name="bus" buses={buses} defaultValue={currentDriver ? currentDriver.bus : ''} />
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