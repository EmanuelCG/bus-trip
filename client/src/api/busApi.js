import axios from 'axios'
const BUS_API = axios.create({
    baseURL: 'http://localhost:8000/api/bus/'

})

export const getAllBus = () => axios.get("http://localhost:8000/api/bus/")
export const getAvailableBuses = () => BUS_API.get('/available/buses/')
export const createBus = (bus) => BUS_API.post('/create-bus/', bus)
export const updateBus = (id, bus) => BUS_API.put(`/edit-bus/${id}/`, bus)
export const deleteBus = (id) => BUS_API.delete(`/delete-bus/${id}/`)
export const findBus = (id) => BUS_API.get(`/find-bus/${id}`)