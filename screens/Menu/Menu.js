import React, { Fragment } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Header, Icon, Overlay, Button } from 'react-native-elements';
import { headerStyles, menuStyles } from '../../styles/styles';
import { Pizzas } from '../../fixtures/PizzaData';
import { EditableCard } from '../EditableCard/EditableCard';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuState: Pizzas,
      visible: false,
      pendingItem: '',
      isEditing: false,
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
    if(!this.state.isEditing) {
      if(!!params) {
        return this.setState({menuState: [ ...menu, params]});
      }
    }
  }

  handleFormEditing = () => this.setState({ isEditing: !this.state.isEditing });

  handleEditedItem = itemFromChild => {
    this.handleFormEditing();
    if (itemFromChild.edited) {
      const { menuState } = this.state;
      const { editedItem, initialItem } = itemFromChild;
      let editedMenuState = [];
      menuState.map(menuStateItem => {
        if ( menuStateItem.description === initialItem.description) {
          return (
            editedMenuState.push(
              {
                img: !!editedItem.img ? editedItem.img : menuStateItem.img,
                name: !!editedItem.name ? editedItem.name : menuStateItem.name,
                description: !!editedItem.description ? editedItem.description : menuStateItem.description,
                price: !!editedItem.price ? editedItem.price : menuStateItem.price,
              }
            ));
          }
        });
      const newMenuState = menuState.filter(menuStateItem => menuStateItem.description !== initialItem.description);
      const combinedMenus = [...newMenuState, ...editedMenuState];
      return this.setState({ menuState: combinedMenus});
    }
  }

  toggleOverlay = item => { this.setState({ visible: !this.state.visible, pendingItem: item }); }

  handleDeleteItem = () => { this.setState({
      menuState: this.state.menuState.filter(itemFromState => itemFromState.name !== this.state.pendingItem.name),
      visible: !this.state.visible,
      isEditing: !this.state.isEditing
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <EditableCard
      item={ item }
      index={ index }
      handleEditedItem={ this.handleEditedItem }
      onDelete={ () => this.toggleOverlay(item) }
    />
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
        data={ this.state.menuState }
        renderItem={this.renderItem}
      />
    </Fragment>
    );
  }
}
