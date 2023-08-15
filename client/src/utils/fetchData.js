import axios from "axios";

//for local dev  http://localhost:5000/
//for prod https://techverse-v2.onrender.com/

async function fetchData(url, method = "get", info) {
  const baseUrl = "http://localhost:5000/";
  let data;
  if (method === "get") {
    const response = await axios.get(`${baseUrl}${url}`);
    data = response.data;
  } else {
    const response = await axios.post(`${baseUrl}${url}`,
      info,
    );
    data = response.data;
  }
  return data;
}

export { fetchData };
