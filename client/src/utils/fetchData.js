import axios from "axios";

//for local dev  http://localhost:5000/
//for prod https://techverse-v2.onrender.com/

async function fetchData(url, method = "get", info) {
  const baseUrl = "https://techverse-v2.onrender.com/";
  let data;
  if (method === "get") {
    try {
      const response = await axios.get(`${baseUrl}${url}`);
      data = response.data;
    } catch (error) {
      data = error.message;
    }
  } else {
    try {
      const response = await axios.post(`${baseUrl}${url}`, info);
      data = response.data;
    } catch (error) {
      data = error.message;
    }
  }
  return data;
}

export { fetchData };
