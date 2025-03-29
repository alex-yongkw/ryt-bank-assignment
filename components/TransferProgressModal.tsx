import { Image, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PopupModal } from "./ui/PopupModal";

type Props = {
  visible: boolean;
};

export function TransferProgressModal({ visible }: Props) {
  return (
    <PopupModal visible={visible}>
      <View style={styles.imageContainer}>
        <Image
          width={120}
          height={120}
          source={require("@/assets/images/send-money.png")}
        />
      </View>
      <Text text60BO style={styles.modalText}>
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
  modalText: {
    marginTop: 14,
  },
});
