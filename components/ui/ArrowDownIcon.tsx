import { Colors } from "@/constants/Colors";
import { View } from "react-native-ui-lib";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";

export function ArrowDownIcon() {
  const colorScheme = useColorScheme();

  const iconColor = useMemo(() => {
    return colorScheme === "light"
      ? Colors.primary.brand.light
      : Colors.primary.brand.dark;
  }, [colorScheme]);

  return (
    <View row centerH>
      <FontAwesome5 name="arrow-down" size={28} color={iconColor} />
    </View>
  );
}
