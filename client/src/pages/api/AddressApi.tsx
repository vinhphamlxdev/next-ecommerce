import axios from "axios";
export const getAllAddress = async () => {
  const response = await axios.get(
    `https://provinces.open-api.vn/api/?depth=2`
  );
  return response.data;
};
