import axios from "axios";
import { ApiErrorResponse } from "@/interfaces/IErrorHandler";

export function handleApiError(error: unknown, fallbackMessage: string): never {
  if (axios.isAxiosError(error)) {
    const msg = error.message;
    const code = error.code;
    const data = error.response?.data;

    if (
      code === "ECONNABORTED" ||
      msg.toLowerCase().includes("timeout")
    ) {
      throw new Error("Request timed out (10s)");
    }

    if (data && typeof data === "object" && !Array.isArray(data)) {
      const errorData = data as ApiErrorResponse;

      if (errorData.errors) {
        const firstError = Object.values(errorData.errors)[0]?.[0];

        if (firstError) {
          throw new Error(firstError);
        }
      }

      if (typeof errorData.message === "string") {
        throw new Error(errorData.message);
      }
    }

    if (typeof data === "string") {
      throw new Error(data);
    }
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(fallbackMessage);
}