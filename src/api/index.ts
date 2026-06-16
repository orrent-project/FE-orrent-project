import axios from "axios"

const api = axios.create({
  baseURL: "/api/proxy", // panggil proxy route, bukan langsung Laravel
  timeout: 30000, // increased from 10s to 30s
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log("[Axios Request] URL:", config.url, "| Timeout:", config.timeout, "ms")
    return config
  },
  (error) => {
    console.error("[Axios Request Error]:", error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log("[Axios Response] Status:", response.status)
    return response
  },
  (error) => {
    console.error("[Axios Response Error] Code:", error.code, "| Message:", error.message)
    return Promise.reject(error)
  }
)

export default api
