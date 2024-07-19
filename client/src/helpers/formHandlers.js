import { getAllBus } from '../api/busApi'
import { getAllJourney, getOneJourney } from '../api/journeyApi'
import { getOneDriver, getAvariableDrivers } from '../api/driverApi'

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

export async function handleFetchOneJourney(id) {
    try {
        const res = await getOneJourney(id)
        return res.data
    } catch {
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

export async function handleFetchOneDriver(id) {
    try {
        const res = await getOneDriver(id)
        return res.data
    } catch {
        console.log('error fetch')
        return []
    }
}



export async function handleFetchAvariableDrivers() {
    try {
        const res = await getAvariableDrivers()
        return res.data
    } catch {
        console.log('error fetch')
        return []
    }
}