import { useEffect, useMemo, useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { formatCurency } from "@/utils/number-formatter";

type Account = {
  id: string;
  name: string;
  balance: number;
};

const accounts: Account[] = [
  { id: "001", name: "Checking Account", balance: 1000.05 },
  { id: "002", name: "Savings Account", balance: 500.2 },
];

export function AccountPicker() {
  const colorScheme = useColorScheme();
  const [selectedAccount, setSelectedAccount] = useState<PickerValue>("");
  const [inputError, setInputError] = useState<string>("");

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.textLight : styles.textDark;
  }, [colorScheme]);

  const placeholderTextColor = useMemo(() => {
    return colorScheme === "light" ? Colors.text.light : Colors.text.dark;
  }, [colorScheme]);

  // subscribe to value change
  useEffect(() => {
    const unsubscribe = Store.transfer.account.value.subscribe((newVal) => {
      setSelectedAccount(newVal);
    });

    return unsubscribe;
  }, []);

  // subscribe to input error change
  useEffect(() => {
    const unsubscribe = Store.transfer.account.error.subscribe((newVal) => {
      setInputError(newVal);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <InputLabel label="From" />
      <Picker
        mode={PickerModes.SINGLE}
        value={selectedAccount as string} // TODO -- Fix type
        placeholder={"Select account"}
        placeholderTextColor={placeholderTextColor}
        onChange={(selectedAcc) => {
          Store.transfer.account.error.clear();
          Store.transfer.account.value.set(selectedAcc as string); // TODO -- Fix type
        }}
        spellCheck={false}
        style={labelStyle}
      >
        {accounts.map((acc) => (
          <Picker.Item
            key={acc.id}
            label={`${acc.name} - MYR ${formatCurency(acc.balance)}`}
            value={acc.id}
          />
        ))}
      </Picker>
      <InputError label={inputError} />
    </View>
  );
}

const styles = StyleSheet.create({
  textLight: {
    fontSize: Layout.input.text,
    color: Colors.text.light,
  },
  textDark: {
    fontSize: Layout.input.text,
    color: Colors.text.dark,
  },
});
