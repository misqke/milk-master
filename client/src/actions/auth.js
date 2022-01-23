import axios from "axios";

export const login = async (password) => {
  try {
    const response = await axios.post(
      "https://milk-master.herokuapp.com/api/auth",
      {
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const isAuth = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
