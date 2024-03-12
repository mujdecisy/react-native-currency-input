import { StyleSheet, View } from 'react-native';
import CurrencyInput from './react-native-decimal-input';

export default function App() {
  return (
    <View style={styles.container}>
      <CurrencyInput onChange={(e)=>{console.log(e)}} initialValue={123.5}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
