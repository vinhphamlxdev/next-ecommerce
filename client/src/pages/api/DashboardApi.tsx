import axiosConfig from "./axiosConfig";

export const getDashboard = async () => {
  const response = await axiosConfig.get(`/dashboard`);
  return response.data;
};
