import axios from "axios";

export const AxiosInstance = () => {
  const request = axios.create({
    baseURL: 'http://172.16.2.19:6633',
    headers: {
      "Content-Type": "application/json",
    }
  })

  return request
}