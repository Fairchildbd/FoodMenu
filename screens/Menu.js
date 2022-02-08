import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Pizzas } from '../fixtures/PizzaData';

export function Menu() {
  const styles = {
    container: {
      marginTop: 30,
    },
    cardContainer: {
      borderRadius: 10,
      backgroundColor: '#5bd1d7',
    },
    cardHeader: {
      backgroundColor: '#5bd1d7'
    },
    lightTheme: {
      color: 'white',
      margin: 5,
    },
  };
  keyExtractor = (item, index) => index.toString();
  
  renderItem = ({ item }) => (
    <View style={ styles.container }>
      <Card containerStyle={ styles.cardContainer }>
        <Card.Title style={ styles.lightTheme }>{item.name}</Card.Title>
        <Card.Divider width={2} color='white' />
        <Card.Image
          style={ { padding: 0 } }
          source={{ uri: item.img }}
        />
        <Text style={ styles.lightTheme }>{item.description}</Text>
        <Text style={ styles.lightTheme }>{item.price}</Text>
      </Card>
    </View>
  );
  
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={Pizzas}
      renderItem={renderItem}
    />
  );
};
