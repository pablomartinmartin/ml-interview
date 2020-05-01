import React from 'react';
import { mount } from 'enzyme';
import Nav from './Nav';

const history = {
  push: jest.fn(),
};

const mountComponent = (props) => {
  const component = mount(
        <Nav.WrappedComponent history={history} {...props} />
  );

  return component;
};

describe('<Nav />', () => {
  let component;

  beforeEach(() => {
    component = mountComponent();
  });

  it('renders nav component', () => {
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  describe('Search actions', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders search button', () => {
      expect(component.find('button')).toBeDefined();
    });    
    
    it('renders search input', () => {
      expect(component.find('input')).toBeDefined();
    });

    it('should call the search function', () => {
      const component = mountComponent();

      const searchButton = component.find('button');

      searchButton.simulate('submit');
      component.update();

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith({
        pathname: '/items',
        search: `?q=`,
      });
    });

    it('should send the query', () => {
      const component = mountComponent();
      const searchInput = component.find('input');

      searchInput.simulate('change', {target: {name: 'searchField', value: 'sillon'}});
      searchInput.simulate('submit');
      component.update();

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith({
        pathname: '/items',
        search: `?q=sillon`,
      });
    });
  });
});
