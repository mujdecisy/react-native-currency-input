import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import DecimalInput from "./lib/src/DecimalInput";

export default function App() {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ borderWidth: 1, borderColor: "black", height: "100vh" }}
    >
      <View style={styles.container}>
        <DecimalInput/>
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
    paddingHorizontal: 5
  },
});
