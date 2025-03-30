import { useEffect, useMemo, useState } from "react";
import { NumberInput, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { StyleSheet } from "react-native";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";
import { ErrorMsg } from "@/constants/ErrorMsg";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

export function AmountInput() {
  const colorScheme = useColorScheme();
  const [_selectedAmount, setSelectedAmount] = useState<number>(0);
  const [inputError, setInputError] = useState<string>("");

  const currrencyStyle = useMemo(() => {
    return colorScheme === "light" ? styles.currencyLight : styles.currencyDark;
  }, [colorScheme]);

  const textColor = useMemo(() => {
    return colorScheme === "light" ? Colors.text.light : Colors.text.dark;
  }, [colorScheme]);

  // subscribe to value change
  useEffect(() => {
    // initiate the store value to 0
    Store.transfer.amount.value.set(0);

    const unsubscribe = Store.transfer.amount.value.subscribe((newVal) => {
      setSelectedAmount(newVal);
    });

    return unsubscribe;
  }, []);

  // subscribe to input error change
  useEffect(() => {
    const unsubscribe = Store.transfer.amount.error.subscribe((newVal) => {
      setInputError(newVal);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <InputLabel label="Amount" />
      <NumberInput
        initialNumber={0}
        fractionDigits={2}
        leadingText="MYR"
        leadingTextStyle={currrencyStyle}
        onChangeNumber={(data) => {
          if (data.type === "valid") {
            Store.transfer.amount.error.clear();
            Store.transfer.amount.value.set(data.number);
          } else {
            Store.transfer.amount.error.set(ErrorMsg.amount.invalid);
          }
        }}
        textFieldProps={{
          style: { color: textColor, fontSize: Layout.input.text },
        }}
      />
      <InputError label={inputError} />
    </View>
  );
}

const styles = StyleSheet.create({
  currencyLight: {
    color: Colors.text.light,
    fontSize: Layout.input.text,
    marginRight: 10,
  },
  currencyDark: {
    color: Colors.text.dark,
    fontSize: Layout.input.text,
    marginRight: 10,
  },
});
