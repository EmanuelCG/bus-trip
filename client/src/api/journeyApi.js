import axios from "axios"

const JOURNEY_API = axios.create({
    baseURL: 'http://localhost:8000/api/journey/'
})

export const getAllJourney = () => JOURNEY_API.get('/')
export const createJourney = (data) => JOURNEY_API.post('/create-journey/', data)
export const updateJourney = (id, data) => JOURNEY_API.put(`/edit-journey/${id}/`, data)
export const deleteJourney = (id) => JOURNEY_API.put(`/delete-journey/${id}/`)

