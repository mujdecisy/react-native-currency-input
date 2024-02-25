import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function CurrencyInput() {

  const [integerPart, setIntegerPart] = useState("");
  const [decimalPart, setDecimalPart] = useState("");
  const integerRef = useRef(null);
  const decimalRef = useRef(null);

  return (
    <View
      style={{ display: "flex", flexDirection: "row", paddingHorizontal: 5 }}
    >
      <TextInput
        ref={integerRef}
        style={{
          flex: 1,
          borderColor: "black",
          borderWidth: 1,
          textAlign: "right",
        }}
        value={integerPart}
        onChangeText={(e) => {
          if (e[e.length - 1] === ",") {
            if (integerPart === "") {
              setIntegerPart("0");
            }
            decimalRef.current.focus();
          } else {
            const newNumber = e.replaceAll(",", "").replaceAll(".", "");
            setIntegerPart(addDots(removeLeadingZeros(newNumber)));
          }
        }}
        onBlur={() => {
          if (integerPart === "") {
            setIntegerPart("0");
          }
        }}
        keyboardType="numeric"
      />

      <Text style={{ marginHorizontal: 5 }}>,</Text>

      <TextInput
        ref={decimalRef}
        style={{ width: 50, borderColor: "black", borderWidth: 1 }}
        keyboardType="numeric"
        value={decimalPart}
        onChangeText={(e) => {
          if (e.length > 2) {
            return;
          }
          if (e.length === 0 && decimalPart.length === 1) {
            integerRef.current.focus();
          }
          setDecimalPart(e);
        }}
        onBlur={() => {
          if (decimalPart === "") {
            setDecimalPart("00");
          }
        }}
      />
    </View>
  );
}

function removeLeadingZeros(numericString) {
    while (numericString.length>0 && numericString[0] === "0"){
        numericString = numericString.slice(1,numericString.length-1);
    }
    return numericString;
}

function addDots(numericString) {
  const result = [];
  for (let i = numericString.length - 1, count = 0; i >= 0; i--) {
    result.unshift(numericString[i]);
    count++;
    if (count % 3 === 0 && i !== 0) {
      result.unshift(".");
    }
  }
  return result.join("");
}
