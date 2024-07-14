import axios from "axios";

const PASSENGER_API = axios.create({
    baseURL: 'http://localhost:8000/api/passenger/'
})


export const getAllPassenger = () => PASSENGER_API.get('/')
export const createPassenger = (data) => PASSENGER_API.post(`/create-passenger/`, data)
export const updatePassenger = (id, data) => PASSENGER_API.put(`/edit-passenger/${id}/`, data)
export const deletePassenger = (id) => PASSENGER_API.delete(`/delete-passenger/${id}/`)