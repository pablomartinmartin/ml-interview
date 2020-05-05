import React, { useState, useEffect } from "react";
import { itemsApi } from "../../api/items";

import "./ResultPage.scss";

const CURRENCY_MAP = {
  ARS: "$",
  USD: "U$S",
  BRL: "R$",
};

const ProductCard = (props) => {
  const {
    product: { id, picture, price, title },
    onClickProduct,
  } = props;

  return (
    <div
      onClick={() => onClickProduct(id)}
      className="results-card"
      data-test="results-card"
    >
      <div className="results-card__picture-wrapper">
        <img src={picture} alt="Product" className="results-card__picture" />
      </div>
      <div>
        <h2 className="medium-text">{`${CURRENCY_MAP[price.currency]} ${
          price.amount
        }`}</h2>
        <h3 className="small-text">{title}</h3>
      </div>
    </div>
  );
};

const ResultsPage = (props) => {
  const queryParams = new URLSearchParams(props.location.search);
  const querySearch = queryParams.get("search");

  const [items, setItems] = useState([]);

  useEffect(() => {
    itemsApi(querySearch).then((response) => setItems(response.items));
  }, [querySearch]);

  const handlerProductDetail = (productId) => {
    props.history.push({
      pathname: `/items/${productId}`,
    });
  };

  const resultsBuilder = () => {
    const itemComponent = items.map((item) => (
      <ProductCard
        key={item.id}
        product={item}
        onClickProduct={handlerProductDetail}
        data-test="results-card"
      />
    ));

    return <div className="list-results-card">{itemComponent}</div>;
  };

  return <>{resultsBuilder()}</>;
};

export default ResultsPage;
