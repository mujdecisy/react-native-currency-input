import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import CurrencyInput from "./react-native-decimal-input";

export default function App() {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ borderWidth: 1, borderColor: "black", height: "100vh" }}
    >
      <View style={styles.container}>
        <CurrencyInput
          onChange={(e) => {
            console.log(e);
          }}
          initialValue={123.5}
        />
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
