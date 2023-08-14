import axios from "axios";

//for local dev  http://localhost:5000/
//for prod https://techverse-xqxz.onrender.com/

async function fetchData(url, method = "get", info) {
  const baseUrl = "https://techverse-xqxz.onrender.com/";
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
