import { Alert, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { Layout } from "@/constants/Layout";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Colors } from "@/constants/Colors";
import { AccountPicker } from "@/components/AccountPicker";
import { ArrowDownIcon } from "@/components/ui/ArrowDownIcon";
import { RecipientPicker } from "@/components/RecipientPicker";
import { AmountInput } from "@/components/AmountInput";
import { OptionalNoteInput } from "@/components/OptionalNoteInput";
import { ActionButton } from "@/components/ui/ActionButton";
import { useCallback, useState } from "react";
import { Store } from "@/store";
import { ErrorMsg } from "@/constants/ErrorMsg";
import { exist } from "@/utils/check-error";
import * as LocalAuthentication from "expo-local-authentication";
import { PinAuthModal } from "@/components/PinAuthModal";
import { TransferProgressModal } from "@/components/TransferProgressModal";
import { TransferErrorModal } from "@/components/TransferErrorModal";
import { TransferSuccessModal } from "@/components/TransferSuccessModal";

export default function TransferScreen() {
  const [useAppPin, setUseAppPin] = useState(false);
  const [showTransferProgress, setShowTransferProgress] = useState(false);
  const [showTransferError, setShowTransferError] = useState(false);
  const [transferErrorMsg, setTransferErrorMsg] = useState("");
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);

  // validate form and set error msg to inputs if any.
  const validateForm = useCallback(() => {
    const account = Store.transfer.account.value.get();
    const recipient = Store.transfer.recipient.value.get();
    const amount = Store.transfer.amount.value.get();

    if (!account) {
      Store.transfer.account.error.set(ErrorMsg.account);
    }

    if (!recipient) {
      Store.transfer.recipient.error.set(ErrorMsg.recipient);
    }

    if (isNaN(amount)) {
      Store.transfer.amount.error.set(ErrorMsg.amount.invalid);

      return; // skip the following amount checking.
    }

    if (amount < 1) {
      Store.transfer.amount.error.set(ErrorMsg.amount.minimum);
    }

    return;
  }, []);

  // check if there's any input error.
  const isFormContainError = useCallback(() => {
    const accountError = Store.transfer.account.error.get();
    const recipientError = Store.transfer.recipient.error.get();
    const amountError = Store.transfer.amount.error.get();

    return exist(accountError) || exist(recipientError) || exist(amountError);
  }, []);

  // 0 = Indicates no enrolled authentication.
  // 1 = Indicates non-biometric authentication (e.g. PIN, Pattern).
  // 2 = Indicates weak biometric authentication. For example, a 2D image-based face unlock.
  // 3 = Indicates strong biometric authentication. For example, a fingerprint scan or 3D face unlock.
  const getEnrolledSecurityLevel = useCallback(async () => {
    return await LocalAuthentication.getEnrolledLevelAsync();
  }, []);

  const requestFundTransfer = useCallback(async () => {
    setShowTransferProgress(true);

    // Mock API
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    setShowTransferProgress(false);

    // setShowTransferSuccess(true);
    setShowTransferError(true);
    setTransferErrorMsg("Unknown error occur, please try again.");
  }, []);

  const biometricOrFallbackAuth = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
      });

      console.log("** auth result:", result);
    } catch (err) {
      // TODO - send error to Log Reporting.

      Alert.alert(
        "Authentication Error",
        "Unknown error occur, please try again.",
        [
          {
            text: "Dismiss",
            style: "cancel",
          },
        ]
      );
    }
  }, []);

  const initiateFundTransfer = useCallback(async () => {
    validateForm();

    if (isFormContainError()) {
      return;
    }

    // no security method enrolled, use App pin to authenticate
    if ((await getEnrolledSecurityLevel()) === 0) {
      setUseAppPin(true);
    } else {
      // Biometric authentication or fallback
      await biometricOrFallbackAuth();
    }
  }, [validateForm]);

  return (
    <View style={styles.viewContainer}>
      <SectionLabel label="Transfer Money" />
      <AccountPicker />
      <ArrowDownIcon />
      <RecipientPicker />
      <AmountInput />
      <OptionalNoteInput />
      <ActionButton label="Send !" onPress={initiateFundTransfer} />
      <PinAuthModal
        visible={useAppPin}
        onCorrectPin={() => {
          setUseAppPin(false);
          requestFundTransfer();
        }}
        onCancel={() => setUseAppPin(false)}
      />
      <TransferProgressModal visible={showTransferProgress} />
      <TransferErrorModal
        visible={showTransferError}
        message={transferErrorMsg}
        onClose={() => setShowTransferError(false)}
      />
      <TransferSuccessModal
        visible={showTransferSuccess}
        message="Transfer Success !"
        onClose={() => setShowTransferSuccess(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: Layout.content.padding,
    backgroundColor: Colors.light.background,
    gap: Layout.form.gap,
  },
});
