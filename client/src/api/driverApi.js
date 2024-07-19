import axios from "axios";

const DRIVER_API = axios.create({
    baseURL: 'http://localhost:8000/api/driver/'
})

export const getAllDriver = () => DRIVER_API.get('/')
export const getOneDriver = (id) => DRIVER_API.get(`/${id}/`)
export const getAvariableDrivers = () => DRIVER_API.get('/avariable/drivers/')
export const updateDriver = (id, data) => DRIVER_API.put(`/edit-driver/${id}/`, data)
export const createDriver = (data) => DRIVER_API.post('/create-driver/', data)
export const deleteDriver = (id) => DRIVER_API.delete(`/delete-driver/${id}/`)