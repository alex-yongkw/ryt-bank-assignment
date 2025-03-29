import { Colors } from "@/constants/Colors";
import { View } from "react-native-ui-lib";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function ArrowDownIcon() {
  return (
    <View row centerH>
      <FontAwesome5 name="arrow-down" size={28} color={Colors.brand} />
    </View>
  );
}
