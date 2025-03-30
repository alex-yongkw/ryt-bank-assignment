import { Button, Image, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PopupModal } from "./ui/PopupModal";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatCurency } from "@/utils/number-formatter";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";

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
  const colorScheme = useColorScheme();

  const messageStyle = useMemo(() => {
    return colorScheme === "light" ? styles.messageLight : styles.messageDark;
  }, [colorScheme]);

  const detailsStyle = useMemo(() => {
    return colorScheme === "light" ? styles.detailsLight : styles.detailsDark;
  }, [colorScheme]);

  return (
    <PopupModal visible={visible}>
      <View style={styles.imageContainer}>
        <MaterialIcons
          name="check-circle"
          size={120}
          color={Colors.utility.green}
        />
      </View>
      <Text text70 style={messageStyle}>
        {message}
      </Text>
      <Text text70 style={detailsStyle}>
        To: {to}
      </Text>
      <Text text70 style={detailsStyle}>
        Amount: {formatCurency(amount)}
      </Text>
      {note && (
        <Text text70 style={detailsStyle}>
          Note: {note}
        </Text>
      )}
      <Text text70 style={detailsStyle}>
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
  messageLight: {
    color: Colors.text.light,
    marginTop: 14,
    marginBottom: 16,
  },
  messageDark: {
    color: Colors.text.dark,
    marginTop: 14,
    marginBottom: 16,
  },
  detailsLight: {
    color: Colors.text.light,
    marginBottom: 6,
  },
  detailsDark: {
    color: Colors.text.dark,
    marginBottom: 6,
  },
});
