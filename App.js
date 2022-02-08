import React from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Menu } from './screens/Menu';

const styles = {
  heading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Header backgroundColor='#f24e49' centerComponent={ {text: 'Pizza', style: styles.heading} } />
      <Menu />
    </SafeAreaProvider>
  );
}
