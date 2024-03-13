import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import {
  clearNumber,
  removeLeadingZeros,
  addDots,
  checkIfIntegerSeperatorDeleted,
  controlSeperators,
  styles,
} from "./decimalInputUtility";
import PropTypes from "prop-types";
import pkg from "../package.json";

function DecimalInput(props) {
  const [integerPart, setIntegerPart] = useState("");
  const [decimalPart, setDecimalPart] = useState("");
  const [cursorAtStartOfDecimal, setCursorAtStartOfDecimal] = useState(false);
  const integerRef = useRef(null);
  const decimalRef = useRef(null);

  useEffect(() => {
    if (props.initialValue !== undefined) {
      let initIntegerPart = Math.floor(props.initialValue);
      initIntegerPart = addDots(initIntegerPart.toString());

      let initDecimalPart = Math.floor(
        (props.initialValue - initIntegerPart) * 100
      );
      initDecimalPart = initDecimalPart.toString().padEnd(2, "0");

      setIntegerPart(initIntegerPart);
      setDecimalPart(initDecimalPart);
    }

    controlSeperators(props.seperatorInteger, props.seperatorDecimal);
  }, []);

  useEffect(() => {
    let value =
      integerPart === ""
        ? 0
        : Number.parseInt(
            clearNumber(integerPart),
            props.seperatorDecimal,
            props.seperatorInteger
          );
    value +=
      decimalPart === ""
        ? 0
        : Number.parseInt(decimalPart.padEnd(2, "0")) / 100;
    props.onChange(value);
  }, [integerPart, decimalPart]);

  return (
    <View style={props.styleContainer}>
      {/* ----------------------------------------------------- INTEGER PART */}
      <TextInput
        ref={integerRef}
        style={props.styleIntegerTextInput}
        value={integerPart}
        onChangeText={(e) => {
          // keep comma hardcoded for jumping decimal point
          if (e.includes(",")) {
            if (integerPart === "") {
              setIntegerPart("0");
            }
            decimalRef.current.focus();
          } else {
            const checkedE = checkIfIntegerSeperatorDeleted(
              e,
              integerPart,
              props.seperatorInteger
            );
            setIntegerPart(
              addDots(
                removeLeadingZeros(
                  clearNumber(
                    checkedE,
                    props.seperatorDecimal,
                    props.seperatorInteger
                  )
                ),
                props.seperatorInteger
              )
            );
          }
        }}
        onFocus={() => {
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

      <Text style={props.styleSeperatorText}>{props.seperatorDecimal}</Text>

      {/* ----------------------------------------------------- DECIMAL PART */}
      <TextInput
        ref={decimalRef}
        style={props.styleDecimalTextInput}
        keyboardType="numeric"
        value={decimalPart}
        onSelectionChange={(e) => {
          setCursorAtStartOfDecimal(
            e.nativeEvent.selection.start === 0 &&
              e.nativeEvent.selection.end === 0
          );
        }}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Backspace" && cursorAtStartOfDecimal) {
            integerRef.current.focus();
          }
        }}
        onChangeText={(e) => {
          const value = clearNumber(
            e,
            props.seperatorDecimal,
            props.seperatorInteger
          );
          if (value.length > 2) {
            return;
          }
          setDecimalPart(value);
        }}
        onFocus={() => {
          if (decimalPart === "00") {
            setDecimalPart("");
          }
        }}
        onBlur={() => {
          if (decimalPart === "") {
            setDecimalPart("00");
          } else {
            setDecimalPart(decimalPart.padEnd(2, "0"));
          }
        }}
      />
    </View>
  );
}

DecimalInput.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.number,
  seperatorInteger: PropTypes.string,
  seperatorDecimal: PropTypes.string,
  styleContainer: PropTypes.object,
  styleIntegerTextInput: PropTypes.object,
  styleSeperatorText: PropTypes.object,
  styleDecimalTextInput: PropTypes.object,
};

DecimalInput.defaultProps = {
  onChange: (val) => {
    console.log(`${pkg.name} changed : ${val}`);
  },
  initialValue: 0,
  seperatorInteger: ".",
  seperatorDecimal: ",",
  styleContainer: styles.container,
  styleIntegerTextInput: styles.integerTextInput,
  styleSeperatorText: styles.seperatorText,
  styleDecimalTextInput: styles.decimalTextInput,
};

export default DecimalInput;
