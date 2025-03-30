import { useEffect, useMemo, useState } from "react";
import { Picker, PickerModes, PickerValue, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";
import { InputError } from "./ui/InputError";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

type Recipient = {
  id: string;
  name: string;
  phoneNumber: string;
};

// TODO -- get recipient from contact list
const recipients: Recipient[] = [
  { id: "001", name: "James", phoneNumber: "017-1234561" },
  { id: "002", name: "Emily", phoneNumber: "013-9999990" },
  { id: "003", name: "Michael", phoneNumber: "016-1234563" },
  { id: "004", name: "Olivia", phoneNumber: "017-1234564" },
  { id: "005", name: "David", phoneNumber: "019-1234565" },
  { id: "006", name: "Emma", phoneNumber: "013-1234566" },
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
    const unsubscribe = Store.transfer.recipientId.value.subscribe((newVal) => {
      setSelectedRecipient(newVal);
    });

    return unsubscribe;
  }, []);

  // subscribe to input error change
  useEffect(() => {
    const unsubscribe = Store.transfer.recipientId.error.subscribe((newVal) => {
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
          Store.transfer.recipientId.error.clear();
          Store.transfer.recipientId.value.set(selectedRecipient as string);

          const recipientName = recipients.filter(
            (r) => r.id === selectedRecipient
          );
          Store.transfer.recipientName.value.set(
            recipientName[0].name as string
          );
        }}
        style={labelStyle}
      >
        {recipients.map((acc) => (
          <Picker.Item
            key={acc.id}
            label={`${acc.name} (${acc.phoneNumber})`}
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
