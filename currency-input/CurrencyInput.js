import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function CurrencyInput({ onChange }) {
  const [integerPart, setIntegerPart] = useState("");
  const [decimalPart, setDecimalPart] = useState("");
  const integerRef = useRef(null);
  const decimalRef = useRef(null);

  useEffect(() => {
    onChange(getValue());
  }, [integerPart, decimalPart]);

  const getValue = () => {
    let value =
      integerPart === "" ? 0 : Number.parseInt(clearNumber(integerPart));
    value += decimalPart === "" ? 0 : Number.parseInt(decimalPart()) / 10;
    return value;
  };

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
            setIntegerPart(addDots(removeLeadingZeros(clearNumber(e))));
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
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Backspace" && decimalPart.length === 0) {
            integerRef.current.focus();
          }
        }}
        onChangeText={(e) => {
          const value = clearNumber(e);
          if (value.length > 2) {
            return;
          }
          setDecimalPart(value);
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

function clearNumber(dirtyNumericString) {
  return dirtyNumericString.replaceAll(",", "").replaceAll(".", "");
}

function removeLeadingZeros(numericString) {
  while (numericString.length > 0 && numericString[0] === "0") {
    numericString = numericString.slice(1, numericString.length - 1);
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
