import axios from "axios";

const JOURNEY_DRIVER_API = axios.create({
    baseURL: 'http://localhost:8000/api/journey-driver/',
})

export const getJourneyDriver = () => JOURNEY_DRIVER_API.get('/')
export const updateJourneyDriver = (id, data) => JOURNEY_DRIVER_API.put(`/edit/${id}/`, data)
export const createJourneyDriver = (data) => JOURNEY_DRIVER_API.post('/create/', data)
export const deleteJourneyDriver = (id) => JOURNEY_DRIVER_API.delete(`/delete/${id}/`)

