import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-ui-lib";

type Props = {
  label: string;
};

export function InputLabel({ label }: Props) {
  const colorScheme = useColorScheme();

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.labelLight : styles.labelDark;
  }, [colorScheme]);

  return (
    <Text text60M style={labelStyle}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  labelLight: {
    color: Colors.text.light,
    marginBottom: Layout.form.input.marginBottom,
  },
  labelDark: {
    color: Colors.text.dark,
    marginBottom: Layout.form.input.marginBottom,
  },
});
