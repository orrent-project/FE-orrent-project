import api from "@/api";
import {
  BookingDetails,
  BookingOfficeFormData,
  CheckBookingFormData,
  Office,
} from "@/interfaces/Type";
import { handleApiError } from "@/utils/handleApiError";

export const fetchAllOffices = async (): Promise<Office[]> => {
  try {
    const res = await api.get("/offices");
    return res.data?.data ?? res.data;
  } catch (error: unknown) {
    handleApiError(error, "Failed to fetch offices");
  }
};

export const fetchOfficeDetails = async (
  slug: string
): Promise<{ data: Office }> => {
  try {
    const res = await api.get(`/office/${slug}`);
    return res.data;
  } catch (error: unknown) {
    handleApiError(error, "Failed to fetch office details");
  }
};

export const bookingOffice = async (
  formData: BookingOfficeFormData
): Promise<BookingDetails> => {
  try {
    const res = await api.post("/booking-transaction", formData);
    return res.data?.data ?? res.data;
  } catch (error: unknown) {
    handleApiError(error, "Failed to create booking transaction");
  }
};

export const fetchBookingDetails = async (
  formData: CheckBookingFormData
): Promise<BookingDetails> => {
  try {
    const res = await api.post("/check-booking", formData);
    return res.data?.data ?? res.data;
  } catch (error: unknown) {
    handleApiError(error, "Failed to fetch booking details");
  }
};