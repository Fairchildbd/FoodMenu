import React, { Fragment } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Card, Header, Icon, Overlay, Button } from 'react-native-elements';
import testID from 'react-native-testid';
import { headerStyles, menuStyles } from '../../styles/styles';
import { Pizzas } from '../../fixtures/PizzaData';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuState: Pizzas,
      visible: false,
      pendingItem: ''
    };
  }

  componentDidMount() {
    const menu = this.props.menu?.map(menuItem => ({
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      img: menuItem.img,
    }));
    const { params } = this.props.navigation();
    if(!!params) {
      return this.setState({menuState: [ ...menu, params]});
    } 
  }
  toggleOverlay = item => { this.setState({ visible: !this.state.visible, pendingItem: item }); }

  handleDeleteItem = () => { this.setState({
      menuState: this.state.menuState.filter(itemFromState => itemFromState.name !== this.state.pendingItem.name),
      visible: !this.state.visible,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <View style={ menuStyles.container }>
      <Card containerStyle={ menuStyles.cardContainer }>
        <TouchableOpacity { ...testID(`Delete-${index}`) } style={ menuStyles.cardIcon } onPress={/* istanbul ignore next */ () => this.toggleOverlay(item) }>
          <Icon name='delete' color='white'/>
        </TouchableOpacity>
        <Card.Title style={ menuStyles.lightTheme }>{item.name}</Card.Title>
        <Card.Divider width={2} color='white' />
        <Card.Image
          style={ { padding: 0 } }
          source={{ uri: item.img }}
        />
        <Text style={ menuStyles.lightTheme }>{item.description}</Text>
        <Text style={ menuStyles.lightTheme }>{item.price}</Text>
      </Card>
    </View>
  );
  
  render() {
    return (
      <Fragment>
      <Header
        backgroundColor='#f24e49'
        centerComponent={ {text: 'Pizza', style: headerStyles.heading} }
        rightComponent={
          <View style={headerStyles.headerRight}>
            <TouchableOpacity style={ headerStyles.headerButtonContainer } onPress={/* istanbul ignore next */ () => this.props.navigation({ route: 'Add Item' })}>
              <Text style={ headerStyles.headerButtonText }>Add Item</Text>
              <Icon name="add" color="white" />
            </TouchableOpacity>
          </View>
        }
      />
      <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
        <Text style={menuStyles.textPrimary}>Are you sure you want to delete this item?</Text>
        <Button
          testID='Confirm Delete'
          title="Delete"
          onPress={ this.handleDeleteItem }
          buttonStyle={ menuStyles.overLayButton }
        />
      </Overlay>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.menuState.filter(element => {
          if (Object.keys(element).length !== 0) {
            return true;
          }
          return false;
        })}
        renderItem={this.renderItem}
      />
    </Fragment>
    );
  }

}
