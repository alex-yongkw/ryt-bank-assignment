import { Button, Text, View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PinInput, type PinInputRef } from "@pakenfit/react-native-pin-input";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { PopupModal } from "./ui/PopupModal";
import { useCallback, useRef, useState } from "react";
import { Secret } from "@/constants/Secret";
import { InputError } from "./ui/InputError";

type Props = {
  visible: boolean;
  onCorrectPin: () => void;
  onCancel: () => void;
};

export function PinAuthModal({ visible, onCorrectPin, onCancel }: Props) {
  const ref = useRef<PinInputRef>(null);
  const [isIncorrectPin, setIsIncorrrectPin] = useState(false);

  const verifyPin = useCallback(
    (pin: string) => {
      if (pin === Secret.appPin) {
        onCorrectPin();
      } else {
        ref.current?.clear();
        setIsIncorrrectPin(true);
      }
    },
    [onCorrectPin, ref]
  );

  return (
    <PopupModal visible={visible}>
      <Text text70BO style={styles.modalText}>
        Use app pin to authenticate
      </Text>
      <PinInput
        ref={ref}
        length={6}
        autoFocus
        onFillEnded={verifyPin}
        inputProps={{
          secureTextEntry: true,
          onChange: () => setIsIncorrrectPin(false),
        }}
        inputStyle={{ width: 50, height: 50 }}
      />
      {isIncorrectPin && (
        <View style={styles.errorLabel}>
          <InputError label="Incorrect pin, please try again." />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          label="Cancel"
          size={Button.sizes.large}
          backgroundColor={Colors.utility.red}
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
  errorLabel: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 18,
  },
});
