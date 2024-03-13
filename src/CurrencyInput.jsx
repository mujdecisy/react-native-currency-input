import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";

function CurrencyInput({ onChange, initialValue }) {
  const [integerPart, setIntegerPart] = useState("");
  const [decimalPart, setDecimalPart] = useState("");
  const integerRef = useRef(null);
  const decimalRef = useRef(null);

  useEffect(() => {
    if (initialValue) {
        const initIntegerPart = Math.floor(initialValue);
        const initDecimalPart = Math.floor((initialValue - initIntegerPart) * 100);
        setIntegerPart(addDots(initIntegerPart.toString()));
        setDecimalPart(initDecimalPart.toString().padEnd(2, "0"));
    }
  }, []);

  useEffect(() => {
    let value =
      integerPart === "" ? 0 : Number.parseInt(clearNumber(integerPart));
    value +=
      decimalPart === ""
        ? 0
        : Number.parseInt(decimalPart.padEnd(2, "0")) / 100;
    onChange(value);
  }, [integerPart, decimalPart]);

  return (
    <View
      style={{ display: "flex", flexDirection: "row", paddingHorizontal: 5 }}
    >
      {/* ----------------------------------------------------- INTEGER PART */}
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
          if (e.includes(",")) {
            if (integerPart === "") {
              setIntegerPart("0");
            }
            decimalRef.current.focus();
          } else {
            setIntegerPart(addDots(removeLeadingZeros(clearNumber(e))));
          }
        }}
        onFocus={()=>{
            if (integerPart === "0") {
                setIntegerPart("");
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

      {/* ----------------------------------------------------- DECIMAL PART */}
      <TextInput
        ref={decimalRef}
        style={{ width: 50, borderColor: "red", borderWidth: 1 }}
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
        onFocus={()=>{
            if (decimalPart === "00") {
                setDecimalPart("");
            }
        }}
        onBlur={() => {
          if (decimalPart === "") {
            setDecimalPart("00");
          } else {
            setDecimalPart(decimalPart.padEnd(2,"0"));
          }
        }}
      />
    </View>
  );
}

CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.number.isRequired,
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


export default CurrencyInput;