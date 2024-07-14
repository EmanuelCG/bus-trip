import axios from "axios"

const LOCATION_API = axios.create({
    baseURL: "http://localhost:8000/api/location/"
})

export const getAllLocation = () => LOCATION_API.get('/')
export const createLocation = (data) => LOCATION_API.post('/create-location/', data)
export const updateLocation = (id, data) => LOCATION_API.put(`/edit-location/${id}/`, data)
export const deleteLocation = (id) => LOCATION_API.delete(`/delete-location/${id}/`)

