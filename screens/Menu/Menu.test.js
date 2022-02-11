import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, fireEvent } from '@testing-library/react-native';
import { Pizzas } from '../../fixtures/PizzaData';

import Menu from './Menu';

describe('<Menu />', () => {

  describe('the screen', () => {
    it('has a render with initial props', () => {
      const props = {
        menu: Pizzas,
        navigation: jest.fn(() => ({
          route: 'Home',
          params: {}
        })),
      };
      const renderer = new ShallowRenderer();
      renderer.render(<Menu { ...props }/>);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
    it('has a render with params from props', () => {
      const props = {
        menu: Pizzas,
        navigation: jest.fn(() => ({
          route: 'Home',
          params: {
            img: 'https://pepperoni.com',
            name: 'Extra Pepperoni Pizza',
            description: 'It has a lot of pepperoni',
            price: '$10.00'
          }
        })),
      };
      const state = {
        menuState: [{
          img: 'https://cheese.com',
          name: 'Extra Cheese Pizza',
          description: 'It has a lot of cheese',
          price: '$5.00'
        }],
        visible: false,
        pendingItem: ''
      };
      const renderer = new ShallowRenderer();
      renderer.render(<Menu { ...props } { ...state }/>);
      expect(renderer.getRenderOutput()).toMatchSnapshot();
    });
    describe('componentDidMount', () => {
      it('can call componentDidMount', async () => {
        const props = {
          menu: [
            {
              img: 'https://pepperoni.com',
              name: 'Extra Pepperoni Pizza',
              description: 'It has a lot of pepperoni',
              price: '$10.00'
            }
          ],
          navigation: jest.fn(() => ({
            route: 'Home',
            params: {}
          })),
        };
        const state = {
          menuState: [{
            img: 'https://pepperoni.com',
            name: 'Extra Pepperoni Pizza',
            description: 'It has a lot of pepperoni',
            price: '$10.00'
          }],
          visible: true,
          pendingItem: ''
        };
        const component = new Menu(props)
        component.state = state;
        await component.componentDidMount();
        component.setState = jest.fn();
        expect(await component.setState).not.toBeCalled();
      });
      it('can call componentDidMount', async () => {
        const props = {
          menu: [
            {
              img: 'https://pepperoni.com',
              name: 'Extra Pepperoni Pizza',
              description: 'It has a lot of pepperoni',
              price: '$10.00'
            }
          ],
          navigation: jest.fn(() => ({
            route: 'Home',
            params: [
              {
                img: 'https://pepperoni.com',
                name: 'Extra Pepperoni Pizza',
                description: 'It has a lot of pepperoni',
                price: '$10.00'
              }
            ]
          })),
        };
        const state = {
          menuState: [{
            img: 'https://pepperoni.com',
            name: 'Extra Pepperoni Pizza',
            description: 'It has a lot of pepperoni',
            price: '$10.00'
          }],
          visible: true,
          pendingItem: ''
        };
        const component = new Menu(props)
        component.state = state;
        await component.componentDidMount();
        component.setState = jest.fn();
        expect(await component.setState).not.toBeCalled();
      });
    });
    describe('toggleOverlay', () => {
      const item = [{
        img: 'https://sausage.com',
        name: 'Extra Sausage Pizza',
        description: 'It has a lot of sausage',
        price: '$5.00'
      }];
      const props = {
        menu: [
          {
            img: 'https://pepperoni.com',
            name: 'Extra Pepperoni Pizza',
            description: 'It has a lot of pepperoni',
            price: '$10.00'
          }
        ],
        navigation: jest.fn(() => ({
          route: 'Home',
          params: {}
        })),
      };
      const state = {
        menuState: [{
          img: 'https://pepperoni.com',
          name: 'Extra Pepperoni Pizza',
          description: 'It has a lot of pepperoni',
          price: '$10.00'
        }],
        visible: true,
        pendingItem: ''
      };
      it('can display an overlay', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Menu { ...props } { ...state }/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
      it('can toggle an overlay', async () => {
        const component = new Menu(props);
        component.state = state;
        component.setState = jest.fn();
        component.toggleOverlay(item);
        expect(await component.setState).toBeCalled();
      });
    });
    describe('handleDeleteItem', () => {
      const props = {
        menu: [
          {
            img: 'https://pepperoni.com',
            name: 'Extra Pepperoni Pizza',
            description: 'It has a lot of pepperoni',
            price: '$10.00'
          }
        ],
        navigation: jest.fn(() => ({
          route: 'Home',
          params: {}
        })),
      };
      const state = {
        menuState: [{
          img: 'https://pepperoni.com',
          name: 'Extra Pepperoni Pizza',
          description: 'It has a lot of pepperoni',
          price: '$10.00'
        },
        {
          img: 'https://sausage.com',
          name: 'Extra Sausage Pizza',
          description: 'It has a lot of sausage',
          price: '$5.00'
        }
        ],
        visible: true,
        pendingItem: [{
          img: 'https://sausage.com',
          name: 'Extra Sausage Pizza',
          description: 'It has a lot of sausage',
          price: '$5.00'
        }]
      };
      it('can delete an item', async () => {
        const component = new Menu(props);
        component.state = state;
        component.setState = jest.fn();
        component.handleDeleteItem();
        expect(await component.setState).toBeCalled();
        expect(component.state).toMatchSnapshot();
      });
    });
    describe('renderItem', () => {
      it('can display an item, and press the delete icon', () => {
        const data = {
          item: {
            img: 'https://sausage.com',
            name: 'Extra Sausage Pizza',
            description: 'It has a lot of sausage',
            price: '$5.00'
          },
        };
        const component = new Menu();
        expect(component.renderItem(data)).toMatchSnapshot();
      });
    });
  });
});
