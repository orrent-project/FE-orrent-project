import api from "@/api"
import { handleApiError } from "@/utils/handleApiError"

export const fetchAllCities=async()=>{
  try {
    const res =await api.get ('/cities')
    return res.data
  } catch (error) {
    handleApiError(error, 'Failed to fetch cities')
  }
}

export const fetchCityDetails=async(slug:string)=>{
  try {
    const res =await api.get(`/city/${slug}`)
    return res.data
  } catch (error) {
    handleApiError(error, 'Failed to fetch city details')
  }
}