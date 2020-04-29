import React from 'react';
import { mount } from 'enzyme';
import Nav from './Nav';


it('renders nav component', () => {
  const component = mount(<Nav />);
  
  expect(component).toBeDefined();
});