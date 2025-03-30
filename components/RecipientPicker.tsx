import { useEffect, useMemo, useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type Recipient = {
  id: string;
  name: string;
  phoneNumber: string;
};

// TODO -- get recipient from contact list
const recipients: Recipient[] = [
  { id: "001", name: "user001", phoneNumber: "0171234561" },
  { id: "002", name: "user002", phoneNumber: "0171234562" },
  { id: "003", name: "user003", phoneNumber: "0171234563" },
  { id: "004", name: "user004", phoneNumber: "0171234564" },
  { id: "005", name: "user005", phoneNumber: "0171234565" },
  { id: "006", name: "user006", phoneNumber: "0171234566" },
];

export function RecipientPicker() {
  const colorScheme = useColorScheme();
  const [selectedRecipient, setSelectedRecipient] = useState<PickerValue>("");
  const [inputError, setInputError] = useState<string>("");

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.textLight : styles.textDark;
  }, [colorScheme]);

  const placeholderTextColor = useMemo(() => {
    return colorScheme === "light" ? Colors.text.light : Colors.text.dark;
  }, [colorScheme]);

  // subscribe to value change
  useEffect(() => {
    const unsubscribe = Store.transfer.recipient.value.subscribe((newVal) => {
      setSelectedRecipient(newVal);
    });

    return unsubscribe;
  }, []);

  // subscribe to input error change
  useEffect(() => {
    const unsubscribe = Store.transfer.recipient.error.subscribe((newVal) => {
      setInputError(newVal);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <InputLabel label="To" />
      <Picker
        mode={PickerModes.SINGLE}
        value={selectedRecipient as string} // TODO -- Fix type
        placeholder={"Select recipient"}
        placeholderTextColor={placeholderTextColor}
        onChange={(selectedRecipient) => {
          Store.transfer.recipient.error.clear();
          Store.transfer.recipient.value.set(selectedRecipient as string);
        }}
        style={labelStyle}
      >
        {recipients.map((acc) => (
          <Picker.Item label={acc.name} key={acc.id} value={acc.id} />
        ))}
      </Picker>
      <InputError label={inputError} />
    </View>
  );
}

const styles = StyleSheet.create({
  textLight: {
    fontSize: 18,
    color: Colors.text.light,
  },
  textDark: {
    fontSize: 18,
    color: Colors.text.dark,
  },
});
