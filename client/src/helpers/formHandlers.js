import { getAllBus } from '../api/busApi'
import { getAllJourney } from '../api/journeyApi'
import { getAllDriver } from '../api/driverApi'

export async function handleFetchAllBuses() {
    try {
        const res = await getAllBus();
        // console.log(res.data)
        return res.data
    } catch (error) {
        console.log('error fetch')
        return []
    }
}

export async function handleFetchJourneys() {
    try {
        const res = await getAllJourney()
        return res.data
    } catch {
        console.log('error fetch')
        return []
    }
}

export async function handleFetchDrivers() {
    try {
        const res = await getAllDriver()
        return res.data
    } catch {
        console.log('error fetch')
        return []
    }
}