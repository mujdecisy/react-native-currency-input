# React Native Decimal Input

The "react-native-decimal-input" library simplifies adding decimal input to React Native projects. With intuitive masking and precise decimal point usage, it's ideal for currency inputs. Easy implementation and customizable props make it developer-friendly, streamlining numeric data entry for various applications.

## **Installation**
```
npm install react-native-decimal-input
```

## **Properties**
**`onChange : func (val)`**
```
Handle changed value over a callback function.

default:
    (val) => {
        console.log(`${pkg.name} changed : ${val}`);
    }
```

**`initalValue : number`**
```
Set initial value of input as number.

default: 0
```

**`seperatorInteger : string`**
```
Set integer seperator text to seperate thousands. Pick not a number character with length 1.

default: "."
```

**`seperatorDecimal : string`**
```
Set decimal seperator text to seperate decimal part. Pick not a number character with length 1.

default: ","
```

**`styleContainer : object`**
```
Write styling dictionary for the layout of input.

default:
    {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5
    }
```

**`styleIntegerTextInput : object`**
```
Write styling dictionary for the integer part of input.

default:
    {
        flex: 1,
        textAlign: "right",
        fontSize: 20,
    }
```

**`styleSeperatorText : object`**
```
Write styling dictionary for the seperator text.

default:
    {
        marginHorizontal: 5,
        fontSize: 20
    }
```

**`styleDecimalTextInput : object`**
```
Write styling dictionary for the decimal part of input.

default:
    {
        width: 50,
        fontSize: 20
    }
```