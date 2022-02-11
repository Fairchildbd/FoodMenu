import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { menuStyles } from '../../styles/styles';
import testID from 'react-native-testid';

export function useEditing() {
  const [isEditing, setIsEditing] = useState(false);
  return { isEditing, setIsEditing };
}

export function EditableCard (props) {
  const [img, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const {isEditing, setIsEditing} = useEditing(false);
  const payload = {
    img,
    name,
    description,
    price,
  };
  const initialItem = {
    img: props?.item?.img,
    name: props?.item?.name,
    description: props?.item?.description,
    price: props?.item?.price
  };
  if(isEditing) {
    return (
      <View style={ menuStyles.container }>
        <Card containerStyle={ menuStyles.cardContainer }>
        <View style={ menuStyles.editButtonSet }>
          <TouchableOpacity { ...testID('Submission') } onPress={ () => { props.handleEditedItem({ editedItem: payload, initialItem, edited: true, }); setIsEditing(false); } }>
            <Icon name='done' color='white'/>
          </TouchableOpacity>
          <TouchableOpacity { ...testID('Cancel') } onPress={ () => { props.handleEditedItem(); setIsEditing(false) }}>
            <Icon name='close' color='white'/>
          </TouchableOpacity>
        </View>
        <Input
          { ...testID('Name') }
          placeholder={props?.item?.name}
          onChangeText={ value => setName(value) }
        />
        <Card.Divider width={2} color='white' />
        <Input
          { ...testID('Img') }
          placeholder={ props?.item?.img }
          onChangeText={ value => setImage(value) }
        />
        <Input
          placeholder={ props?.item?.description }
          onChangeText={ value => setDescription(value) }
        />
        <Input
          placeholder={ props?.item?.price }
          onChangeText={ value => setPrice(value) }
        />
      </Card>
    </View>
    );
  } else {
    return (
      <View style={ menuStyles.container }>
      <Card containerStyle={ menuStyles.cardContainer }>
        <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
          <TouchableOpacity { ...testID('Edit') } onPress={ () => setIsEditing(true) }>
            <Icon name='edit' color='white'/>
          </TouchableOpacity>
          <Card.Title style={ { color: 'white'} }>{props?.item?.name}</Card.Title>
          <TouchableOpacity { ...testID('Delete') } onPress={ props.onDelete }>
            <Icon name='delete' color='white'/>
          </TouchableOpacity>
        </View>
        <Card.Divider width={2} color='white' />
        <Card.Image
          style={ { padding: 0 } }
          source={{ uri: props?.item?.img }}
        />
        <Text style={ menuStyles.lightTheme }>{props?.item?.description}</Text>
        <Text style={ menuStyles.lightTheme }>{props?.item?.price}</Text>
      </Card>
    </View>
    );
  }
}