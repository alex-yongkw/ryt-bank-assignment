import { Image, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PopupModal } from "./ui/PopupModal";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  visible: boolean;
};

export function TransferProgressModal({ visible }: Props) {
  const colorScheme = useColorScheme();

  const modalTextStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.modalTextLight
      : styles.modalTextDark;
  }, [colorScheme]);

  return (
    <PopupModal visible={visible}>
      <View style={styles.imageContainer}>
        <Image
          width={120}
          height={120}
          source={require("@/assets/images/send-money.png")}
        />
      </View>
      <Text text60BO style={modalTextStyle}>
        Sending ...
      </Text>
    </PopupModal>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  modalTextLight: {
    color: Colors.text.light,
    marginTop: 14,
  },
  modalTextDark: {
    color: Colors.text.dark,
    marginTop: 14,
  },
});
