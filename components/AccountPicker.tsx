import { useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";

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

  return (
    <View>
      <InputLabel label="From" />
      <Picker
        mode={PickerModes.SINGLE}
        value={selectedAccount as any} // TODO -- Fix type
        placeholder={"Select account"}
        onChange={(selectedAcc) => setSelectedAccount(selectedAcc)}
      >
        {accounts.map((acc) => (
          <Picker.Item label={acc.name} key={acc.id} value={acc.id} />
        ))}
      </Picker>
    </View>
  );
}
