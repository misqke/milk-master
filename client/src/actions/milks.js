import axios from "axios";

export const getAllMilks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://milk-master.herokuapp.com/api/milks",
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
