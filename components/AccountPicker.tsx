import { useEffect, useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";

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

  useEffect(() => {
    const unsubscribe = Store.transfer.subscribeAccount((newVal) => {
      setSelectedAccount(newVal);
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
          Store.transfer.setAccount(selectedAcc as string); // TODO -- Fix type
        }}
      >
        {accounts.map((acc) => (
          <Picker.Item label={acc.name} key={acc.id} value={acc.id} />
        ))}
      </Picker>
    </View>
  );
}
