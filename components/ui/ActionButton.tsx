import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-ui-lib";

type Props = {
  label: string;
  onPress: () => void;
};

export function ActionButton({ label, onPress }: Props) {
  const colorScheme = useColorScheme();

  const buttonColor = useMemo(() => {
    return colorScheme === "light"
      ? Colors.primary.brand.light
      : Colors.primary.brand.dark;
  }, [colorScheme]);

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.labelLight : styles.labelDark;
  }, [colorScheme]);

  return (
    <Button
      label={label}
      size={Button.sizes.large}
      labelStyle={labelStyle}
      backgroundColor={buttonColor}
      borderRadius={Layout.actionButton.borderRadius}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  labelLight: {
    fontSize: Layout.input.text,
    color: "#ffffff",
  },
  labelDark: {
    fontSize: Layout.input.text,
    fontWeight: 700,
    color: Colors.primary.brand.light,
  },
});
