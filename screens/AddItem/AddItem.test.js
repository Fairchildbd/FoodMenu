import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { AddItem } from './AddItem';

describe('<AddItem />', () => {
  afterAll(cleanup);
  const payload = {
    img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/margherita.7d3b623ceb66e87fc7247fa81c6cfdc1.1.jpg?width=800',
    name: 'Cheese Pizza',
    description: 'It has a lot of cheese',
    price: '$10.25'
  };
  const props = {
    navigation: jest.fn()
  };
  it('can render the screen', () => {
    const tree = renderer.create(<AddItem { ...props }/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can fire a submission', () => {
    const { getByTestId, getByPlaceholderText } = render(<AddItem { ...props } />);
    fireEvent.changeText(getByPlaceholderText('Image URL'), payload.img);
    fireEvent.changeText(getByPlaceholderText('Title of Item'), payload.name);
    fireEvent.changeText(getByPlaceholderText('Description of Item'), payload.description);
    fireEvent.changeText(getByPlaceholderText('Price of Item'), payload.price);
    fireEvent.press(getByTestId('Submission'), { route: 'Home', params: payload });
    expect(props.navigation).toHaveBeenCalledWith({ route: 'Home', params: payload });
  });
  it('can go back home with no params', () => {
    const { getByText } = render(<AddItem { ...props } />);
    fireEvent.press(getByText('Go Back'), { route: 'Home'});
    expect(props.navigation).toHaveBeenCalledWith({ route: 'Home'});
  });
});
