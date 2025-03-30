import { Button, Image, Text, View } from "react-native-ui-lib";
import { StyleSheet, useColorScheme } from "react-native";
import { PopupModal } from "./ui/PopupModal";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo } from "react";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export function TransferErrorModal({ visible, message, onClose }: Props) {
  const colorScheme = useColorScheme();

  const errorMessageStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.errorMessageLight
      : styles.errorMessageDark;
  }, [colorScheme]);

  return (
    <PopupModal visible={visible}>
      <View style={styles.imageContainer}>
        <MaterialIcons name="error" size={120} color={Colors.utility.red} />
      </View>
      <Text text70 style={errorMessageStyle}>
        {message}
      </Text>
      <Button
        label="Close"
        outline
        outlineColor={Colors.utility.red}
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
  errorMessageLight: {
    color: Colors.text.light,
    marginTop: 14,
    marginBottom: 16,
  },
  errorMessageDark: {
    color: Colors.text.dark,
    marginTop: 14,
    marginBottom: 16,
  },
});
