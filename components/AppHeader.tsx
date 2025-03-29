import { Text, View } from "react-native-ui-lib";
import { Avatar } from "./ui/Avatar";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export function AppHeader() {
  return (
    <View row centerV>
      <Avatar />
      <Text text50BL style={styles.label}>
        RightBank
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.brand,
  },
});
