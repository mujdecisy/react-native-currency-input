import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import CurrencyInput from "./CurrencyInput";

export default function App() {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ borderWidth: 1, borderColor: "black", height: "100vh" }}
    >
      <View style={styles.container}>
        <CurrencyInput onChange={(e)=>{
          console.log("new value appeared : ", e)
        }}/>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
