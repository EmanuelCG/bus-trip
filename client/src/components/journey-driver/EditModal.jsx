import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateJourneyDriver } from "../../api/journeyDriverApi";
import { handleFetchAvailableDrivers, handleFetchJourneys } from '../../helpers/formHandlers'
import JourneySelector from "./selector/JourneySelector";
import DriverSelector from "./selector/DriverSelector";
import DatePicker from "react-datepicker";

export default function EditModal({ isOpenEdit, onCloseEdit, setJourneyDriver, journeyDriver, current, states }) {
    const { register, handleSubmit, reset, control, setValue } = useForm({
        defaultValues: { datetime_start: '', state: '', journey: '', driver: '' }
    })

    const [journeys, setJourneys] = useState([])
    const [drivers, setDrivers] = useState([])
    const [startDate, setStartDate] = useState()

    useEffect(() => {
        async function loadJourneys() {
            try {
                const res = await handleFetchJourneys();
                setJourneys(res)
                if (current.journey) {
                    const currentJourney = res.find(journey => journey.id === current.journey);
                    if (currentJourney) {
                        console.log(currentJourney)
                        setValue('journey', {
                            value: currentJourney.id,
                            label: currentJourney.location_origin_name + ' to ' + currentJourney.location_destination_name,
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setJourneys([]);
            }


        }

        async function loadDrivers() {
            try {
                const res = await handleFetchAvailableDrivers();
                setDrivers(res)
                if (current.driver) {
                    const currentDriver = res.find(driver => driver.id === current.driver)
                    if (currentDriver) {
                        console.log(current)
                        setValue('driver', {
                            value: currentDriver.id,
                            label: currentDriver
                        })
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setDrivers([]);
            }
        }

        loadJourneys()
        loadDrivers()

    }, [current, setValue, reset])

    const onSubmit = handleSubmit(async (data) => {
        const res = await updateJourneyDriver(current.id, data)
        if (res.status === 200) {
            setJourneyDriver(journeyDriver.map(obj => (obj.id === current.id ? res.data : obj)));
        }
        toast.info('Edition completed!', { theme: "colored", position: "top-center" });
        reset();
        onCloseEdit();
    })



    if (!isOpenEdit) return null;

    return (
        <div id="edit-bus-modal" tabIndex="-1" aria-hidden="true" className="fixed left-0 right-0 z-50 flex justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 top-20 md:inset-0">
            <div className="relative w-full max-w-3xl max-h-full p-4 mt-20">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow ">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 ">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Edit Journey Driver
                        </h3>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto" data-modal-toggle="edit-bus-modal" onClick={onCloseEdit}>
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
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure Time</label>
                                <DatePicker
                                    useRange={false}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showTimeSelect
                                    dateFormat="YYYY-MM-dd h:mm aa"
                                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    calendarClassName="shadow-lg border border-gray-300 rounded-md"
                                    dayClassName={() => "text-sm p-1 rounded-full hover:bg-gray-200"}
                                    wrapperClassName="w-full" />
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="plate" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select {...register('state', { required: true })} name="state" defaultValue="" id="states" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="" disabled>Choose a status</option>
                                    {
                                        states.map(state => (
                                            <option key={state[0]} value={state[0]}>{state[0]}: {state[1]}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">

                            <div className="col-span-8">
                                <JourneySelector control={control} name="journey" journeys={journeys} defaultValue={current ? current.journey : ''} />
                            </div>


                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">

                            <div className="col-span-8">
                                <DriverSelector control={control} name="driver" drivers={drivers} defaultValue={current ? current.driver : ''} />
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Update journey
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}