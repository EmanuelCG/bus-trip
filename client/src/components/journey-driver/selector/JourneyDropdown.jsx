import { useEffect, useState } from "react"
import { handleFetchJourneys } from '../../../helpers/formHandlers'


const JourneyDropdown = ({ selectedJourney, setSelectedJourney }) => {

    const [journeys, setJourneys] = useState([])

    useEffect(() => {

        async function loadJourneys() {
            const res = await handleFetchJourneys()
            setJourneys(res)
        }

        loadJourneys()

    }, [])

    return (
        <>

            <label htmlFor="countries" className="text-sm font-medium text-gray-900 ">Select Journey</label>
            <select id="countries" value={selectedJourney} onChange={e => setSelectedJourney(e.target.value)} className="block w-full h-12 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">

                <option selected>Choose a Journey</option>
                {
                    journeys.map(journey => (
                        <option key={journey.id} value={journey.id}>{journey.description}</option>
                    ))
                }
            </select>

        </>
    )
}

export default JourneyDropdown