const express = require("express");
const request = require("request");
const querystring = require("querystring");
const { find } = require("lodash");
const app = express();
const port = 3001;

const API_BASE_URL = "https://api.mercadolibre.com";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/items", (req, res, next) => {
  const itemsQueryString = querystring.stringify({ q: req.query.q });
  const URL_RESULTS_ITEMS = `${API_BASE_URL}/sites/MLA/search?${itemsQueryString}`;

  request.get(URL_RESULTS_ITEMS, (error, response, itemsData) => {
    const { results, available_filters } = JSON.parse(itemsData);

    const categories = find(available_filters, { id: "category" });
    const formattedResults = results.slice(0, 4).map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        amount: String(item.price).split(".")[0] || item.price,
        currency: item.currency_id,
        decimals: String(item.price).split(".")[1] || "",
      },
      picture: item.thumbnail,
      free_shipping: item.shipping.free_shipping,
      condition: item.condition,
    }));

    const itemsResults = {
      author: {
        name: "Pablo",
        lastname: "Martin",
      },
      items: formattedResults,
      categories,
    };

    //   res.status('200').json(itemsResults)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(itemsResults));
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
