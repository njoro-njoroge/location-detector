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

const updateLocation = async (data) => {
  try {
    const result = await ApiManager("update_location.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.date;
  }
};

// get users
const getAllUsers = async (data) => {
  try {
    const result = await ApiManager("get_all_users.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
// ADD BOX
const addNewPolygon = async (data) => {
  try {
    const result = await ApiManager("add_polygon.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

//SUBMIT COORDINATES
const submitCoords = async (data) => {
  try {
    const result = await ApiManager("add_coordinate.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
//MARK POLYGON DONE
const markPolygonDone = async (data) => {
  try {
    const result = await ApiManager("mark_polygon_done.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
//GET POLYGONS
const getPolygons = async (data) => {
  try {
    const result = await ApiManager("get_polygons.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

// GET ALL POLYGONS COORDS
const getAllPolygonsCoords = async (data) => {
  try {
    const result = await ApiManager("get_all_polygons_coords.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

// GET POLYGONS
const shinglePolygon = async (data) => {
  try {
    const result = await ApiManager("shinglePolygon.php", {
      method: "POST",
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
// GET ALL POLYGONS
const getAllPolygons = async (data) => {
  try {
    const result = await ApiManager("polygons.php", {
      method: "POST",
      data: "data",
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export {
  clientLogin,
  clientRegister,
  clientUpdate,
  updateLocation,
  getAllUsers,
  getAllPolygonsCoords,
  addNewPolygon,
  submitCoords,
  markPolygonDone,
  getPolygons,
  shinglePolygon,
  getAllPolygons,
};
