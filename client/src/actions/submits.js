import axios from "axios";

export const submitInventory = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      "https://milk-master.herokuapp.com/api/submits/inventory",
      data,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getConfirmation = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      "https://milk-master.herokuapp.com/api/submits/confirmation",
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
