import axiosInstance from "./AxiosInstance";

export const tokenValidity = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get("/user/id")
    return response.data.success;
  } catch (error) {
    return false;
  }
};


export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/user/id")
    return response.data;
  } catch (error) {
    return null;
  }
}