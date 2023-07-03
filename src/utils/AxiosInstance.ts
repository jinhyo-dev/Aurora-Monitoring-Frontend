import axios from "axios";

export const AxiosInstance = () => {
  console.log(import.meta.env.VITE_API_URL)
  const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    }
  })

  return request
}