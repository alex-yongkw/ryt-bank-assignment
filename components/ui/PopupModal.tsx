import { Modal, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, type PropsWithChildren } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";

type Props = {
  visible: boolean;
} & PropsWithChildren;

export function PopupModal({ visible, children }: Props) {
  const colorScheme = useColorScheme();

  const modalViewStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.modalViewLight
      : styles.modalViewDark;
  }, [colorScheme]);

  return (
    <SafeAreaView>
      <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.centeredView}>
          <View style={modalViewStyle}>{children}</View>
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
  modalViewLight: {
    margin: 20,
    backgroundColor: Colors.card.light,
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
  modalViewDark: {
    margin: 20,
    backgroundColor: Colors.card.dark,
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
