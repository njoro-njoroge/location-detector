/** @format */

import ApiManager from "./ApiManager";

const clientLogin = async (data) => {
  try {
    const result = await ApiManager("login.php", {
      method: "POST",
      // headers: {
      //   "content-type": "application/json",
      // },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.date;
  }
};

const clientRegister = async (data) => {
  try {
    const result = await ApiManager("register.php", {
      method: "POST",
      // headers: {
      //   "content-type": "application/json",
      // },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.date;
  }
};

const clientUpdate = async (data) => {
  try {
    const result = await ApiManager("update_profile.php", {
      method: "POST",
      // headers: {
      //   "content-type": "application/json",
      // },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.date;
  }
};
export { clientLogin, clientRegister, clientUpdate };
