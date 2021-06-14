import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // on server
    return axios.create({
      baseURL: process.env.SERVER_URL_BASE,
      headers: req.headers,
    });
  } else {
    // on browser
    return axios.create({
      baseURL: "/",
    });
  }
};
