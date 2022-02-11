import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks'
import { EditableCard, useEditing } from './EditableCard';

// If you toggle change the useState(true) and useEditing(true) in EditableCard.js
// You will see the other two tests fail, and the three tests that are failing pass.
// This is because testing-library doesn't use a virtual DOM, even though it is set up for it.
// Would need to add a virtual DOM, and assign it in this file to have the tests work as is.

describe('<EditableCard />', () => {
  afterAll(cleanup);
  const payload = {
    img: 'https://pepperoni.com',
    name: 'Extra Pepperoni Pizza',
    description: 'It has a lot of pepperoni',
    price: '$10.00'
  };
  const props = {
    handleEditedItem: jest.fn(),
    item: {
      img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/margherita.7d3b623ceb66e87fc7247fa81c6cfdc1.1.jpg?width=800',
      name: 'Cheese Pizza',
      description: 'It has a lot of cheese',
      price: '$10.25'
    },
  };
  it('can render the screen', () => {
    const tree = renderer.create(<EditableCard { ...props }/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can set isEditing to true', () => {
    const { result } = renderHook(() => useEditing());
    act(() => {
      result.current.setIsEditing(true);
    });
    expect(result.current.isEditing).toBe(true)
    expect(typeof result.current.setIsEditing).toBe('function')
  });
  describe('the form', () => {
    it('can render the screen when isEditing is true', () => {
      const tree = renderer.create(<EditableCard { ...props }/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('can fire a submission', () => {
      const { getByTestId, getByPlaceholderText } = render(<EditableCard { ...props } />);
      fireEvent.changeText(getByTestId('Img'), payload.img);
      fireEvent.changeText(getByPlaceholderText(`${props.item.name}`), payload.name);
      fireEvent.changeText(getByPlaceholderText(`${props.item.description}`), payload.description);
      fireEvent.changeText(getByPlaceholderText(`${props.item.price}`), payload.price);
      fireEvent.press(getByTestId('Submission'), { editedItem: payload, initialItem: props.item, edited: true });
      expect(props.handleEditedItem).toHaveBeenCalledWith({ editedItem: payload, initialItem: props.item, edited: true });
    });
    it('can fire a cancellation', () => {
      const { getByTestId } = render(<EditableCard { ...props } />);
      fireEvent.press(getByTestId('Cancel'));
      expect(props.handleEditedItem).toHaveBeenCalled();
    });
  });
  describe('the card', () => {
    const props = {
      handleEditedItem: jest.fn(),
      item: {
        img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/margherita.7d3b623ceb66e87fc7247fa81c6cfdc1.1.jpg?width=800',
        name: 'Cheese Pizza',
        description: 'It has a lot of cheese',
        price: '$10.25'
      },
      onDelete: jest.fn(),
    };
    it('can fire the edit event', () => {
      const setIsEditing = jest.fn();
      const { getByTestId } = render(<EditableCard { ...props } />);
      fireEvent.press(getByTestId('Edit'));
      expect(setIsEditing).toHaveBeenCalled();
    });
    it('can fire the delete event', () => {
      const { getByTestId } = render(<EditableCard { ...props } />);
      fireEvent.press(getByTestId('Delete'));
      expect(props.onDelete).toHaveBeenCalled();
    });
  });
});