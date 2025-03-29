import { Button, Modal, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PinInput } from "@pakenfit/react-native-pin-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { PopupModal } from "./ui/PopupModal";

type Props = {
  visible: boolean;
  onPinFilled: (pin: string) => void;
  onCancel: () => void;
};

export function PinAuthModal({ visible, onPinFilled, onCancel }: Props) {
  return (
    <PopupModal visible={visible}>
      <Text text70BO style={styles.modalText}>
        Use app pin to authenticate
      </Text>
      <PinInput
        length={6}
        autoFocus
        onFillEnded={onPinFilled}
        inputProps={{ secureTextEntry: true }}
        inputStyle={{ width: 50, height: 50 }}
      />
      <View style={styles.buttonContainer}>
        <Button
          label="Cancel"
          size={Button.sizes.large}
          backgroundColor={Colors.button.danger}
          borderRadius={Layout.actionButton.borderRadius}
          onPress={onCancel}
        />
      </View>
    </PopupModal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 18,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 18,
  },
});
