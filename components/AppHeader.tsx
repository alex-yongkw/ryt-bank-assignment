import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Avatar } from "./ui/Avatar";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo, useState } from "react";
import { SettingIcon } from "./ui/SettingIcon";
import { SettingModal } from "./SettingModal";

export function AppHeader() {
  const colorScheme = useColorScheme();
  const [showSettingPopup, setShowSettingPopup] = useState(false);

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.labelLight : styles.labelDark;
  }, [colorScheme]);

  return (
    <View row centerV>
      <Avatar />
      <Text text50BL style={labelStyle}>
        RightBank
      </Text>
      <SettingIcon
        onPress={() => {
          setShowSettingPopup(true);
        }}
      />
      <SettingModal
        visible={showSettingPopup}
        onClose={() => setShowSettingPopup(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelLight: {
    color: Colors.primary.brand.light,
    flex: 1,
  },
  labelDark: {
    color: Colors.primary.brand.dark,
    flex: 1,
  },
});
