import React from "react";
const ProductPage = (props) => {
  const productId = props.match.params.id;

  return (
    <div>
      <h1 data-test="soy-h1" >I'm Product view of {productId}</h1>
    </div>
  );
};

export default ProductPage;
