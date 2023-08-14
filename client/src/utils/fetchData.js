import axios from "axios";

async function fetchData(url, method = "get", info) {
  const baseUrl = "https://techverse-xqxz.onrender.com/";
  let data;
  if (method === "get") {
    const response = await axios.get(`${baseUrl}${url}`);
    data = response.data;
  } else {
    const response = await axios.post(`${baseUrl}${url}`, JSON.stringify(info));
    data = response.data;
  }
  return data;
}

export { fetchData };
