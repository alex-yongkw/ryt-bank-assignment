import { useEffect, useState } from "react";
import { NumberInput, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { StyleSheet } from "react-native";
import { Store } from "@/store";

export function AmountInput() {
  const [_selectedAmount, setSelectedAmount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = Store.transfer.subscribeTransferAmount((newVal) => {
      setSelectedAmount(newVal);
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
            setSelectedAmount(data.number);
          } else {
            // TODO -- handle input error
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  currency: {
    marginRight: 10,
  },
});
