import React from "react";
import { mount } from "enzyme";

import ResultsPage from "./ResultsPage";

const mountComponent = (props) => {
  const component = mount(
    <ResultsPage
      location={{search: '?q='}}
      {...props}
    />
  );

  return component;
};


describe('<ResultsPage />', () => {
    let component;
    
    it('renders the component', () => {
        component = mountComponent();

        expect(component.find('ResultsPage')).toBeDefined();
    });

    it('renders only 4 results', () => {
        component = mountComponent();

        expect(component.find('results-card')).toBeDefined();
        expect(component.find('results-card')).toHaveLength(4);
    });

    it('calls the buy action', () => {
        const onProductSelect = jest.fn();
        component = mountComponent();

        component.find('results-card').simulate('click');

        expect(onProductSelect).toHaveBeenCalled();
    });
});