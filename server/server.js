const express = require("express");
const request = require("request");
const Promise = require("promise");
const querystring = require("querystring");
const { find, first } = require("lodash");
const app = express();
const port = 3001;

const API_BASE_URL = "https://api.mercadolibre.com";
const AUTHOR_DATA = {
  author: {
    name: "Pablo",
    lastname: "Martin",
  },
};

const getItems = (URL_REQUEST) => {
  var options = {
    url: URL_REQUEST,
    headers: {
      "User-Agent": "request",
    },
  };
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

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
        amount: Number(String(item.price).split(".")[0]) || item.price,
        currency: item.currency_id,
        decimals: Number(String(item.price).split(".")[1]) || "",
      },
      picture: item.thumbnail,
      free_shipping: item.shipping.free_shipping,
      condition: item.condition,
    }));

    const itemsResults = {
      author: AUTHOR_DATA.author,
      items: formattedResults,
      categories,
    };

    //   res.status('200').json(itemsResults)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(itemsResults));
  });
});

app.get("/api/items/:id", (req, res, next) => {
  const URL_ITEMS_BY_ID = `${API_BASE_URL}/items/${req.params.id}`;
  const URL_ITEMS_DESCRIPTION = `${API_BASE_URL}/items/${req.params.id}/description`;

  const itemsByIdPromise = getItems(URL_ITEMS_BY_ID);
  const descriptionByIdPromise = getItems(URL_ITEMS_DESCRIPTION);

  const batchItems = Promise.all([itemsByIdPromise, descriptionByIdPromise]);

  batchItems.then((results) => {
    const productData = first(results);
    const productPlainDescription = results[1].plain_text;

    const formattedItem = {
      id: productData.id,
      title: productData.title,
      price: {
        currency: productData.currency_id,
        amount: Number(String(productData.price).split(".")[0]) || productData.price,
        decimals: Number(String(productData.price).split(".")[1]) || "",
      },
      picture: first(productData.pictures).url,
      condition: productData.condition,
      free_shipping: productData.shipping.free_shipping,
      sold_quantity: productData.sold_quantity,
      description: productPlainDescription,
    };

    const itemsResults = {
      author: AUTHOR_DATA.author,
      item: formattedItem,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(itemsResults));
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
