import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Avatar } from "./ui/Avatar";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";

export function AppHeader() {
  const colorScheme = useColorScheme();

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.labelLight : styles.labelDark;
  }, [colorScheme]);

  return (
    <View row centerV>
      <Avatar />
      <Text text50BL style={labelStyle}>
        RightBank
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelLight: {
    color: Colors.primary.brand.light,
  },
  labelDark: {
    color: Colors.primary.brand.dark,
  },
});
