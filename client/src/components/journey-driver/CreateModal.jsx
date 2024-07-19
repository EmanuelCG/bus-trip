// import Datepicker from "react-tailwindcss-datepicker"
import Datepicker from "react-datepicker"
import { useForm } from 'react-hook-form'
import { createJourneyDriver } from '../../api/journerDriverApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import JourneySelector from "./selector/JourneySelector";
import DriverSelector from "./selector/DriverSelector";
import { handleFetchJourneys, handleFetchAvariableDrivers } from "../../helpers/formHandlers"


export default function CreateModal({ isOpenCreate, onCloseCreate, setJourneyDriver, journeyDriver, states }) {
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: { datetime_start: '', state: '', driver: '', journey: '' }
    });

    const [journeys, setJourneys] = useState([])
    const [drivers, setDrivers] = useState([])


    useEffect(() => {
        async function loadJourneys() {
            try {
                const data = await handleFetchJourneys();
                setJourneys(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setJourneys([]);
            }
        }

        async function loadDrivers() {
            try {
                const data = await handleFetchAvariableDrivers();
                console.log(data)
                setDrivers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setDrivers([]);
            }
        }

        loadJourneys()
        loadDrivers()

    }, [])

    const onSubmit = handleSubmit(async (data) => {
        const formattedDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
        data.datetime_start = formattedDate;
        data.driver = data.driver.value
        data.journey = data.journey.value
        console.log(data)
        const res = await createJourneyDriver(data);
        if (res.status === 201) {
            setJourneyDriver([...journeyDriver, res.data])
        }

        toast.success('Driver created succesfully!', { theme: "colored", position: "top-center" });
        reset();
        onCloseCreate();
    });

    const [startDate, setStartDate] = useState(new Date());

    if (!isOpenCreate) return null;

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
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto" data-modal-toggle="create-driver-modal" onClick={onCloseCreate}>
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
                            <div className="col-span-4">
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure Time</label>
                                <Datepicker
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

                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">

                            <div className="col-span-8">
                                <JourneySelector control={control} name="journey" journeys={journeys} />
                            </div>


                        </div>
                        <div className="grid grid-cols-8 gap-4 mb-4">

                            <div className="col-span-8">
                                <DriverSelector control={control} name="driver" drivers={drivers} />
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}