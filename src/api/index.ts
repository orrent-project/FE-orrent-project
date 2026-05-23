import axios from "axios"

const api = axios.create({
  baseURL: "/api/proxy", // panggil proxy route, bukan langsung Laravel
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
