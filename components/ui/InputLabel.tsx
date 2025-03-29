import { Layout } from "@/constants/Layout";
import { StyleSheet } from "react-native";
import { Text } from "react-native-ui-lib";

type Props = {
  label: string;
};

export function InputLabel({ label }: Props) {
  return (
    <Text text70BO style={styles.label}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: Layout.form.input.marginBottom,
  },
});
