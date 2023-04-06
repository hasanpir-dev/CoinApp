import axios from "axios";

const getAuthorized = async () => {
  const backendURL = "http://localhost:4000/api/auth/user";

  let authToken = localStorage.getItem("userToken");
  if (!authToken) {
    return false;
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + authToken,
      },
    };
    const { data } = await axios.get(`${backendURL}`, config);

    return data;
  } catch (e) {
    return false;
  }
};

export default getAuthorized;

try {
} catch (e) {}
