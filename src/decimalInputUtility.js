function clearNumber(dirtyNumericString, seperatorDecimal, seperatorInteger) {
  return dirtyNumericString
    .replaceAll(seperatorDecimal, "")
    .replaceAll(seperatorInteger, "");
}

function removeLeadingZeros(numericString) {
  while (numericString.length > 0 && numericString[0] === "0") {
    numericString = numericString.slice(1, numericString.length - 1);
  }
  return numericString;
}

function addDots(numericString, seperatorInteger) {
  const result = [];
  for (let i = numericString.length - 1, count = 0; i >= 0; i--) {
    result.unshift(numericString[i]);
    count++;
    if (count % 3 === 0 && i !== 0) {
      result.unshift(seperatorInteger);
    }
  }
  return result.join("");
}

function checkIfIntegerSeperatorDeleted(
  newIntegerPart,
  integerPart,
  seperatorInteger
) {
  resultVal = newIntegerPart;
  if (newIntegerPart.length < integerPart.length) {
    let i = newIntegerPart.length - 1;
    let j = integerPart.length - 1;
    while (newIntegerPart[i] === integerPart[j]) {
      i--;
      j--;
    }

    if (integerPart[j] === seperatorInteger) {
      resultVal =
        newIntegerPart.slice(0, i) +
        newIntegerPart.slice(i + 1, newIntegerPart.length);
    }
  }
  return resultVal;
}

function controlSeperators(seperatorInteger, seperatorDecimal) {
  if (seperatorInteger.length !== 1 || /\d/.test(seperatorInteger)) {
    console.warn(`${pkg.name} : seperatorInteger is not in a good shape`);
  }
  if (seperatorDecimal.length !== 1 || /\d/.test(seperatorDecimal)) {
    console.warn(`${pkg.name} : seperatorDecimal is not in a good shape`);
  }
}

const defaultFontSize = 20;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  },
  integerTextInput: {
    flex: 1,
    textAlign: "right",
    fontSize: defaultFontSize,
  },
  seperatorText: { marginHorizontal: 5, fontSize: defaultFontSize },
  decimalTextInput: { width: 50, fontSize: defaultFontSize },
};

export {
  clearNumber,
  removeLeadingZeros,
  addDots,
  checkIfIntegerSeperatorDeleted,
  controlSeperators,
  styles,
};
