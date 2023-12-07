// @ts-nocheck
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000"
})

export const fetchEntries = async (date) => {
    const response = await api.get(`/entries/?date=${date}`)
    return response.data;
}

export const fetchDatesRange = async () => {
    const response = await api.get(`/entries/range/`)
    return response.data
}