import { getAllBus, getAvailableBuses } from '../api/busApi'
import { getAllJourney, getOneJourney } from '../api/journeyApi'
import { getOneDriver, getAvailableDrivers } from '../api/driverApi'

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

export async function handleFetchAvailableBuses() {
    try {
        const res = await getAvailableBuses()
        return res.data
    } catch {
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



export async function handleFetchAvailableDrivers() {
    try {
        const res = await getAvailableDrivers()
        return res.data
    } catch {
        console.log('error fetch')
        return []
    }
}

