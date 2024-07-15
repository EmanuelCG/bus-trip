import { getAllBus } from '../api/busApi'

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