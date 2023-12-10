// @ts-nocheck
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000"
})

export const fetchEntries = async (dateFrom, dateTo) => {
    const response = await api.get(`/entries/`, {
        headers: {
            "date-from": dateFrom,
            "date-to": dateTo
        }
    })
    return response.data;
}

export const fetchDatesRange = async () => {
    const response = await api.get(`/entries-range/`)
    return response.data
}