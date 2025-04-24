import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
const serverRoot = process.env.REACT_APP_SERVER_CONNECT;

  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(serverRoot + "auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

// const res = await fetch(serverRoot + "/auth/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(userCredential)
// });

// const data = await res.json(); // parse the JSON response