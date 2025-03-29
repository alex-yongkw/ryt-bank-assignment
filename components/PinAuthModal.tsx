import { Button, Modal, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PinInput } from "@pakenfit/react-native-pin-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

type Props = {
  visible: boolean;
  onPinFilled: (pin: string) => void;
  onCancel: () => void;
};

export function PinAuthModal({ visible, onPinFilled, onCancel }: Props) {
  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 18,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 18,
  },
});
