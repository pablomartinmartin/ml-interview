import axios from "axios";

export function itemsApi(query) {
  return axios
    .get("http://localhost:3001/api/items", {
      params: {
        q: query,
      },
    })
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
