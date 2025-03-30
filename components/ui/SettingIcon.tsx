import { Colors } from "@/constants/Colors";
import { View } from "react-native-ui-lib";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  onPress: () => void;
};

export function SettingIcon({ onPress }: Props) {
  const colorScheme = useColorScheme();

  const iconColor = useMemo(() => {
    return colorScheme === "light" ? "#4D5963" : "#E8ECF0";
  }, [colorScheme]);

  return (
    <View row centerH>
      <Ionicons
        name="settings-sharp"
        size={28}
        color={iconColor}
        onPress={onPress}
      />
    </View>
  );
}
