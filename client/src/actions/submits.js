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

export const submitOrder = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      "https://milk-master.herokuapp.com/api/submits/order",
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

export const getConfirmation = async (num) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://milk-master.herokuapp.com/api/submits/confirmation/?num=num`,
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
