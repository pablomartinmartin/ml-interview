import React, { useState, useEffect, useContext } from "react";
import { isEmpty } from 'lodash';

import MlContext from '../../context';

import Loader from '../Loader/Loader';

import { itemsApi } from "../../api/items";
import { CONDITION_MAP, CURRENCY_MAP } from "../constants";
import "./ResultPage.scss";

import shippingLogo from "../../assets/ic_shipping.png";

const ConditionIcon = (condition) => {
  let conditionComponent = null;

  if (condition) {
    conditionComponent = (
      <img alt="condition" src={shippingLogo} />
    );
  }
  return conditionComponent;
};

const ProductCard = (props) => {
  const {
    product: { id, picture, price, title, condition },
    onClickProduct,
  } = props;
  
  if (isEmpty(props.product)) {
    return <Loader />;
  }

  return (
    <div
      onClick={() => onClickProduct(id)}
      className="results-card"
      data-test="results-card"
    >
      <div className="cell results-card__picture-wrapper">
        <img src={picture} alt="Product" className="results-card__picture" />
      </div>
      <div>
        <div className="results-card__price-wrapper">
          <h2 className="medium-text">{`${CURRENCY_MAP[price.currency]} ${
            price.amount
          }`}</h2>
          <ConditionIcon condition={CONDITION_MAP[condition].showIcon}/>
        </div>

        <h3 className="small-text">{title}</h3>
      </div>
    </div>
  );
};

const ResultsPage = (props) => {
  const queryParams = new URLSearchParams(props.location.search);
  const querySearch = queryParams.get("search");
  const [items, setItems] = useState([]);
  const {dispatch} = useContext(MlContext);

  useEffect(() => {
    itemsApi(querySearch).then(({items, categories}) => {
      setItems(items);
      dispatch({type: "SET_CATEGORIES", payload: categories})
    });
  }, [querySearch, dispatch]);

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
