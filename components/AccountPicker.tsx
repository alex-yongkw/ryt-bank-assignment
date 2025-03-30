import { useCallback, useEffect, useMemo, useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { AccountService } from "@/services/account";
import { useFocusEffect } from "expo-router";

type Account = {
  id: string;
  name: string;
  balance: number;
};

export function AccountPicker() {
  const colorScheme = useColorScheme();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<PickerValue>("");
  const [inputError, setInputError] = useState<string>("");

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.textLight : styles.textDark;
  }, [colorScheme]);

  const placeholderTextColor = useMemo(() => {
    return colorScheme === "light" ? Colors.text.light : Colors.text.dark;
  }, [colorScheme]);

  const getBankAccounts = useCallback(async () => {
    const accountService = await AccountService.getInstance();

    const result = await accountService.getAll();

    setAccounts(
      result.map((r) => ({
        id: r.id,
        name: r.name,
        balance: r.balance,
      }))
    );
  }, []);

  useFocusEffect(
    // useCallback to prevent infinite loops
    useCallback(() => {
      getBankAccounts();
    }, [])
  );

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
        style={labelStyle}
      >
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} label={acc.name} value={acc.id} />
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
