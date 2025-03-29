import { useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";

type Recipient = {
  id: string;
  name: string;
  phoneNumber: string;
};

const recipients: Recipient[] = [
  { id: "001", name: "user001", phoneNumber: "0171234561" },
  { id: "002", name: "user002", phoneNumber: "0171234562" },
  { id: "001", name: "user003", phoneNumber: "0171234563" },
  { id: "002", name: "user004", phoneNumber: "0171234564" },
  { id: "001", name: "user005", phoneNumber: "0171234565" },
  { id: "002", name: "user006", phoneNumber: "0171234566" },
];

export function RecipientPicker() {
  const [selectedAccount, setSelectedAccount] = useState<PickerValue>("");

  return (
    <View>
      <InputLabel label="To" />
      <Picker
        mode={PickerModes.SINGLE}
        value={selectedAccount as any} // TODO -- Fix type
        placeholder={"Select recipient"}
        onChange={(selectedAcc) => setSelectedAccount(selectedAcc)}
      >
        {recipients.map((acc) => (
          <Picker.Item label={acc.name} key={acc.id} value={acc.id} />
        ))}
      </Picker>
    </View>
  );
}
