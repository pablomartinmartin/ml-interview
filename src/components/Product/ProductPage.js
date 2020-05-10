import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import Loader from "../Loader/Loader";

import { itemByIdApi } from "../../api/items";

import { CONDITION_MAP, CURRENCY_MAP } from "../constants";

import "./ProductPage.scss";
const ProductPage = (props) => {
  const productId = props.match.params.id;

  const [item, setItem] = useState({});

  useEffect(() => {
    itemByIdApi(productId).then((response) => setItem(response));
  }, [productId]);

  const {
    condition,
    description,
    picture,
    price: { amount = "ARS", currency } = {},
    sold_quantity,
    title,
  } = item;

  if (isEmpty(item)) {
    return <Loader />;
  }

  return (
    <div className="product-page">
      <div className="row product-page__main">
        <div className="cell">
          <img
            alt="producto"
            src={picture}
            className="product-page__picture"
            data-test="product-image"
          />
        </div>
        <div className="cell product-page__buy-wrapper">
          <div className="product-page__condition">{`${CONDITION_MAP[condition].text} - ${sold_quantity} vendidos`}</div>
          <div>
            <h3 className="product-page__title large-text">{title}</h3>
            <h2
              className="product-page__price x-large-text "
              data-test="product-price"
            >{`${CURRENCY_MAP[currency]} ${amount}`}</h2>
          </div>
          <button
            type="button"
            className="product-page__buy-btn"
            data-test="product-buy-btn"
          >
            Comprar
          </button>
        </div>
      </div>
      <div className="product-page__description">
        <h2>Descripción del Producto</h2>
        <div
          className="product-page__description-text"
          data-test="product-description"
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
