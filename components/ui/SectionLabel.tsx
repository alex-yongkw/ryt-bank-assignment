import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-ui-lib";

type Props = {
  label: string;
};

export function SectionLabel({ label }: Props) {
  const colorScheme = useColorScheme();

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.labelLight : styles.labelDark;
  }, [colorScheme]);

  return (
    <Text text50 style={labelStyle}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  labelLight: {
    color: Colors.text.light,
  },
  labelDark: {
    color: Colors.text.dark,
  },
});
