import React, { Fragment, useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header, Icon, Input, Button } from 'react-native-elements';
import { headerStyles } from '../../styles/styles';

export function AddItem(props) {
  const [img, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const payload = {
    img,
    name,
    description,
    price
  };
  return (
    <Fragment>
      <Header
        backgroundColor='#f24e49'
        leftComponent={
          <View style={headerStyles.headerLeft}>
            <TouchableOpacity style={ headerStyles.headerButtonContainer } onPress={() => props.navigation({ route: 'Home' })}>
              <Icon name="arrow-back-ios" color="white" />
              <Text style={ headerStyles.headerButtonText }>Go Back</Text>
            </TouchableOpacity>
          </View>
        }
        centerComponent={ {text: 'Add Item', style: headerStyles.heading} }
      />
      <View style={ { margin: 10 } }>
        <Input
          placeholder='Image URL'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          onChangeText={ value => setImage(value) }
        />
        <Input
          placeholder='Title of Item'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          onChangeText={ value => setName(value) }
        />
        <Input
          placeholder='Description of Item'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          onChangeText={ value => setDescription(value) }
        />
        <Input
          placeholder='Price of Item'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          onChangeText={ value => setPrice(value) }
        />
        <Button testID='Submission' buttonStyle={ { backgroundColor: '#5bd1d7' } } onPress={ () => props.navigation({ route: 'Home', params: payload }) } title='Submit' />
      </View>
    </Fragment>
  )
}
