import { useEffect, useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";

type Account = {
  id: string;
  name: string;
  balance: number;
};

const accounts: Account[] = [
  { id: "001", name: "Checking Account", balance: 1000 },
  { id: "002", name: "Savings Account", balance: 500 },
];

export function AccountPicker() {
  const [selectedAccount, setSelectedAccount] = useState<PickerValue>("");
  const [inputError, setInputError] = useState<string>("");

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
        onChange={(selectedAcc) => {
          Store.transfer.account.error.clear();
          Store.transfer.account.value.set(selectedAcc as string); // TODO -- Fix type
        }}
      >
        {accounts.map((acc) => (
          <Picker.Item label={acc.name} key={acc.id} value={acc.id} />
        ))}
      </Picker>
      <InputError label={inputError} />
    </View>
  );
}
