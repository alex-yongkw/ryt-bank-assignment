import { Modal, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { type PropsWithChildren } from "react";

type Props = {
  visible: boolean;
} & PropsWithChildren;

export function PopupModal({ visible, children }: Props) {
  return (
    <SafeAreaView>
      <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
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
});
