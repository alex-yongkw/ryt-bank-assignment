import { Colors } from "@/constants/Colors";
import { View } from "react-native-ui-lib";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { TransferType } from "@/types";

type Props = {
  type: TransferType;
};

export function TransferTypeIcon({ type }: Props) {
  const color = useMemo(
    () => (type === "in" ? Colors.utility.green : Colors.utility.red),
    [type]
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      icon: {
        transform: type === "in" ? "rotate(45deg)" : "rotate(-135deg)",
      },
    });
  }, [type]);

  return (
    <View row centerH style={styles.icon}>
      <Ionicons name="arrow-down-circle" size={46} color={color} />
    </View>
  );
}
