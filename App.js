import React, { PureComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Menu from './screens/Menu/Menu';
import { AddItem } from './screens/AddItem/AddItem';
import { Pizzas } from './fixtures/PizzaData';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navigation: {
        route: 'Home',
      }
    }
  }
  navigationCallback = (navigationFromChild) => {
    if(!!navigationFromChild) {
      return this.setState({ navigation: navigationFromChild });
    }
    return this.state.navigation;
  }
  render() {
    const { navigation } = this.state;
    if (navigation.route === 'Home') {
      return (
        <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
          <Menu menu={ Pizzas } navigation={ this.navigationCallback }/>
        </SafeAreaProvider>
      );
    } else if (navigation.route === 'Add Item') {
      return (
        <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
          <AddItem navigation={ this.navigationCallback } />
        </SafeAreaProvider>
      );
    } else {
      return (
        <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
          <Menu menu={ Pizzas } navigation={ this.navigationCallback }/>
        </SafeAreaProvider>
      );
    }
  }
}
