import axios from "axios"


const SEAT_API = axios({
    baseURL: "http://localhost:8000/api/seat/"
})

export const getAllSeat = () => SEAT_API.get('/')
export const createSeat = (data) => SEAT_API.post('/create/', data)
export const updateSeat = (id, data) => SEAT_API.put(`/edit/${id}/`, data)
export const deleteSeat = (id) => SEAT_API.delete(`/delete/${id}/`)
