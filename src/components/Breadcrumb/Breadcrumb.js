import React, { useContext } from "react";
import { isEmpty } from "lodash";

import MlContext from "../../context";

import './Breadcrumb.scss';

const Breadcrumb = () => {
  const {
    state: { categories, showBreadcrumb },
  } = useContext(MlContext);

  let breadcrumbComponent = null;

  if (showBreadcrumb && !isEmpty(categories)) {
      console.log('categories: ', categories);

    const itemCategories = categories.slice(0, 4).map((category, index) => <div key={category.id} className="breadcrumb__category">{`${category.name}  ${index < 3 ? '>' : ''}`}</div>);

    breadcrumbComponent = (
      <div className="breadcrumb">{itemCategories}</div>
    );
  }

  return breadcrumbComponent;
};

export default Breadcrumb;
