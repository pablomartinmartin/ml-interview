import React from "react";
import { mount } from "enzyme";

import ProductPage from "./ProductPage";

const mountComponent = (props) => {
  const component = mount(
    <ProductPage
      match={{ params: { id: 1 }, isExact: true, path: '', url: '' }}
      {...props}
    />
  );

  return component;
};

describe('<ProductPage />', () => {
    let component;
    
    it('renders the component', () => {
        component = mountComponent();

        expect(component.find('ProductPage')).toBeDefined();
    });

    it('renders the main components', () => {
        component = mountComponent();

        expect(component.find('product-buy-btn')).toBeDefined();
        expect(component.find('product-image')).toBeDefined();
        expect(component.find('product-price')).toBeDefined();
        expect(component.find('product-description')).toBeDefined();
    });

    it('calls the buy action', () => {
        const onBuyProduct = jest.fn();
        component = mountComponent();

        component.find('product-buy-btn').simulate('click');

        expect(onBuyProduct).toHaveBeenCalled();
    });
});