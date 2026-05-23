import api from "@/api";
import { handleApiError } from "@/utils/handleApiError";

export const fetchAllOffices=async ()=>{
  try {
    const res =await api.get('/offices')
    return res.data
  } catch (error) {
    handleApiError(error, 'Failed to fetch offices')
  }
}

export const fetchOfficeDetails=async(slug:string)=>{
  try {
    const res = await api.get(`/office/${slug}`)
    return res.data
  } catch (error) {
    handleApiError(error, 'Failed to fetch office details')
  }
}

/**
 * Create a new booking transaction
 * @param formData - Object berisi data booking (misalnya name, email, tanggal, dll)
 */
export const bookingOffice = async (formData: Record<string, any>) => {
  try {
    const res = await api.post("/booking-transaction", formData);
    return res.data;
  } catch (error) {
    handleApiError(error, "Failed to create booking transaction");
  }
};