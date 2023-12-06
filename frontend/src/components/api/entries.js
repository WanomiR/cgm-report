// @ts-nocheck
import {api} from "../../utils/api"

export const fetchEntries = async (date) => {
    const response = await api.get(`/entries/?date=${date}`)
    return response.data;
}

export const fetchDatesRange = async () => {
    const response = await api.get(`entries/range/`)
    return response.data
}