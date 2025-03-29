import { Layout } from "@/constants/Layout";
import { StyleSheet } from "react-native";
import { Text } from "react-native-ui-lib";

type Props = {
  label: string;
};

export function InputError({ label }: Props) {
  return (
    <Text text80 style={styles.error}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#ef4444",
    marginBottom: Layout.form.input.marginBottom,
  },
});
