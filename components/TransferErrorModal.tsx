import { Button, Image, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PopupModal } from "./ui/PopupModal";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export function TransferErrorModal({ visible, message, onClose }: Props) {
  return (
    <PopupModal visible={visible}>
      <View style={styles.imageContainer}>
        <MaterialIcons name="error" size={120} color={Colors.error} />
      </View>
      <Text text70 style={styles.errorMessage}>
        {message}
      </Text>
      <Button
        label="Close"
        outline
        outlineColor={Colors.button.danger}
        outlineWidth={2}
        size={Button.sizes.large}
        borderRadius={Layout.actionButton.borderRadius}
        onPress={onClose}
      />
    </PopupModal>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  errorMessage: {
    marginTop: 14,
    marginBottom: 16,
  },
});
