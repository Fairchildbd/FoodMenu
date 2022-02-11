import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme, { shallow, render }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  describe('the screens', () => {
    it('renders the home screen correctly', () => {
      const renderer = new ShallowRenderer();
      const state = {
        navigation: {
          route: 'Home',
          params: {},
        },
      };
      renderer.render(<App { ...state }/>);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
        it('renders the home screen correctly', () => {
      const renderer = new ShallowRenderer();
      const state = {
        navigation: {
          route: 'Home',
          params: {},
        },
      };
      renderer.render(<App { ...state }/>);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
    it('renders the add item screen correctly', () => {
      const renderer = new ShallowRenderer();
      const state = {
        navigation: {
          route: 'Add Item',
          params: {},
        },
      };
      renderer.render(<App { ...state }/>);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
    it('renders the defaulted screen correctly', () => {
      const renderer = new ShallowRenderer();
      const state = {
        navigation: {
          route: 'Blah',
          params: {},
        },
      };
      renderer.render(<App { ...state }/>);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
  });
  describe('navigationCallback', () => {
    const state = {
      navigation: {
          route: 'Home',
          params: {}
        }
      };
    it('can update navigation state', async () => {
      const navigationFromChild = {
        route: 'Add Item',
        params: { price: '$3.50' },
      };
      const component = new App();
      component.state = state;
      component.setState = jest.fn();
      component.navigationCallback(navigationFromChild);
      expect(await component.setState).toBeCalled();
    });
    it('can maintain navigation state', async () => {
      const navigationFromChild = {
        route: 'Home',
        params: {},
      };
      const component = new App();
      component.state = state;
      component.setState = jest.fn();
      component.navigationCallback(navigationFromChild);
      expect(await component.setState).toBeCalled();
      expect(component.state).toBe(state);
    });
  });
});
