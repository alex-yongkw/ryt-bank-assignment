import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { Layout } from "@/constants/Layout";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Colors } from "@/constants/Colors";
import { AccountPicker } from "@/components/AccountPicker";
import { ArrowDownIcon } from "@/components/ui/ArrowDownIcon";
import { RecipientPicker } from "@/components/RecipientPicker";

export default function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
      <SectionLabel label="Transfer Money" />
      <AccountPicker />
      <ArrowDownIcon />
      <RecipientPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: Layout.content.padding,
    backgroundColor: Colors.light.background,
    gap: Layout.form.gap,
  },
});
