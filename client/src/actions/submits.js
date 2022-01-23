import axios from "axios";

export const submitInventory = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://milk-master.herokuapp.com/api/submits/inventory",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
