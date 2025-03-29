import { Text, View } from "react-native-ui-lib";

import { Avatar } from "./ui/Avatar";
import { Colors } from "@/constants/Colors";

export function AppHeader() {
  return (
    <View row centerV>
      <Avatar />
      <Text text50BL style={{ color: Colors.brand }}>
        RightBank
      </Text>
    </View>
  );
}
