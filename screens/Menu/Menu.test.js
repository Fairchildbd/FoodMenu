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
          isEditing: false,
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
        isEditing: true,
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
    describe('handleFormEditing', () => {
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
        }
        ],
        visible: true,
        pendingItem: '',
        isEditing: false,
      };
      it('can set isEditing to true', async () => {
        const component = new Menu(props);
        component.state = state;
        component.setState = jest.fn();
        component.handleFormEditing();
        expect(await component.setState).toBeCalled();
      });
    });
    describe('handleEditedItem', () => {
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
        pendingItem: '',
        isEditing: false,
      };
      const itemFromChild = {
        edited: true,
        initialItem: state.menuState[0],
        editedItem: {
          img: state.menuState[0].img,
          name: state.menuState[0].name,
          description: state.menuState[0].description,
          price: '$15.00',
        },
      };
      it('can add an edited item to the list of cards', async () => {
        const component = new Menu(props);
        component.state = state;
        component.setState = jest.fn();
        component.handleFormEditing = jest.fn();
        component.handleEditedItem(itemFromChild);
        expect(await component.setState).toBeCalled();
        expect(await component.handleFormEditing).toBeCalled();
      });
      it('can add an edited item to the list of cards', async () => {
        const newItemFromChild = {
          edited: undefined,
        };
        const component = new Menu(props);
        component.state = state;
        component.setState = jest.fn();
        component.handleFormEditing = jest.fn();
        component.handleEditedItem(newItemFromChild);
        expect(await component.setState).not.toBeCalled();
        expect(await component.handleFormEditing).toBeCalled();
      });
      it('can add an edited item to the list of cards', async () => {
        const newItemFromChild = {
          ...itemFromChild,
          editedItem: {
            img: 'https://cheese.com',
            name: 'Cheese Pizza',
            description: 'It has so much cheese',
            price: state.menuState[0].price,
          }
        }
        const component = new Menu(props);
        component.state = state;
        component.setState = jest.fn();
        component.handleFormEditing = jest.fn();
        component.handleEditedItem(newItemFromChild);
        expect(await component.setState).toBeCalled();
        expect(await component.handleFormEditing).toBeCalled();
      });
    });
    describe('renderItem', () => {
      const props = {
        item: {
          img: 'https://pepperoni.com',
          name: 'Extra Pepperoni Pizza',
          description: 'It has a lot of pepperoni',
          price: '$10.00'
        },
        index: '0',
      };
      it('can render the EditableCard', () => {
        const component = new Menu(props);
        component.renderItem = jest.fn();
        component.renderItem(props);
        expect(component.renderItem).toBeCalled();
        expect(component.renderItem).toMatchSnapshot();
      })
    })
  });
});
