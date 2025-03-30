import { Button, Image, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PopupModal } from "./ui/PopupModal";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatCurency } from "@/utils/number-formatter";

type Props = {
  visible: boolean;
  message: string;
  to: string;
  amount: number;
  note?: string;
  referenceNo: string;
  onClose: () => void;
};

export function TransferSuccessModal({
  visible,
  message,
  to,
  amount,
  note,
  referenceNo,
  onClose,
}: Props) {
  return (
    <PopupModal visible={visible}>
      <View style={styles.imageContainer}>
        <MaterialIcons
          name="check-circle"
          size={120}
          color={Colors.utility.green}
        />
      </View>
      <Text text70 style={styles.message}>
        {message}
      </Text>
      <Text text70 style={styles.details}>
        To: {to}
      </Text>
      <Text text70 style={styles.details}>
        Amount: {formatCurency(amount)}
      </Text>
      {note && (
        <Text text70 style={styles.details}>
          Note: {note}
        </Text>
      )}
      <Text text70 style={styles.details}>
        Reference No. {referenceNo}
      </Text>
      <Button
        label="Close"
        outline
        outlineColor={Colors.utility.green}
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
  message: {
    marginTop: 14,
    marginBottom: 16,
  },
  details: {
    marginBottom: 6,
  },
});
