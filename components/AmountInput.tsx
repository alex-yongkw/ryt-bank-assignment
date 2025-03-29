import { useEffect, useState } from "react";
import { NumberInput, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { StyleSheet } from "react-native";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";
import { ErrorMsg } from "@/constants/ErrorMsg";

export function AmountInput() {
  const [_selectedAmount, setSelectedAmount] = useState<number>(0);
  const [inputError, setInputError] = useState<string>("");

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
        leadingTextStyle={styles.currency}
        onChangeNumber={(data) => {
          if (data.type === "valid") {
            Store.transfer.amount.error.clear();
            Store.transfer.amount.value.set(data.number);
          } else {
            Store.transfer.amount.error.set(ErrorMsg.amount.invalid);
          }
        }}
      />
      <InputError label={inputError} />
    </View>
  );
}

const styles = StyleSheet.create({
  currency: {
    marginRight: 10,
  },
});
