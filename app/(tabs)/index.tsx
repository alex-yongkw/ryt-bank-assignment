import { AccountPicker } from "@/components/AccountPicker";
import { AmountInput } from "@/components/AmountInput";
import { OptionalNoteInput } from "@/components/OptionalNoteInput";
import { PinAuthModal } from "@/components/PinAuthModal";
import { RecipientPicker } from "@/components/RecipientPicker";
import { TransferErrorModal } from "@/components/TransferErrorModal";
import { TransferProgressModal } from "@/components/TransferProgressModal";
import { TransferSuccessModal } from "@/components/TransferSuccessModal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowDownIcon } from "@/components/ui/ArrowDownIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Colors } from "@/constants/Colors";
import { ErrorMsg } from "@/constants/ErrorMsg";
import { Layout } from "@/constants/Layout";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { TransactionHistoryService } from "@/services/transaction-history";
import { Store } from "@/store";
import { exist } from "@/utils/check-error";
import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

type TransferDetails = {
  to: string;
  amount: number;
  note?: string;
  ref: string;
};

export default function TransferScreen() {
  const colorScheme = useColorScheme();
  const [useAppPin, setUseAppPin] = useState(false);
  const [showTransferProgress, setShowTransferProgress] = useState(false);
  const [showTransferError, setShowTransferError] = useState(false);
  const [transferErrorMsg, setTransferErrorMsg] = useState("");
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);
  const [transferSuccessDetails, setTransferSuccessDetails] =
    useState<TransferDetails>({
      to: "",
      amount: 0,
      note: "",
      ref: "",
    });

  // validate form and set error msg to inputs if any.
  const validateForm = useCallback(() => {
    const account = Store.transfer.account.value.get();
    const recipient = Store.transfer.recipientId.value.get();
    const amount = Store.transfer.amount.value.get();

    if (!account) {
      Store.transfer.account.error.set(ErrorMsg.account);
    }

    if (!recipient) {
      Store.transfer.recipientId.error.set(ErrorMsg.recipient);
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
    const recipientError = Store.transfer.recipientId.error.get();
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

    const account = Store.transfer.account.value.get();
    const recipientId = Store.transfer.recipientId.value.get();
    const recipientName = Store.transfer.recipientName.value.get();
    const amount = Store.transfer.amount.value.get();
    const note = Store.transfer.note.value.get();

    const mockApiSetting = Store.apiSettings.value.get();

    // show respective popup according to selected API setting.
    switch (mockApiSetting) {
      case "success": {
        const transactionHistoryService =
          await TransactionHistoryService.getInstance();

        const recordId = await transactionHistoryService.insertTransactionRow({
          transferType: "in",
          account,
          recipientId: recipientId,
          recipientName: recipientName,
          amount,
          note,
        });

        setTransferSuccessDetails({
          to: recipientName,
          amount,
          note,
          ref: recordId as string,
        });

        setShowTransferSuccess(true);
        break;
      }
      case "insufficientFund": {
        setTransferErrorMsg("Insufficient balance.");
        setShowTransferError(true);
        break;
      }
      case "networkError": {
        setTransferErrorMsg("Network error, please try again.");
        setShowTransferError(true);
        break;
      }
      case "unknownError": {
        setTransferErrorMsg("Unknown error, please try again.");
        setShowTransferError(true);
        break;
      }
      default: {
        // TODO -- send error to Log rreporting tools
      }
    }
  }, []);

  const biometricOrFallbackAuth = useCallback(async () => {
    try {
      const authResult = await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
      });

      if (authResult.success) {
        requestFundTransfer();
      } else {
        // TODO -- handle auth error
      }
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

  const viewContainerStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.viewContainerLight
      : styles.viewContainerDark;
  }, [colorScheme]);

  return (
    <View style={viewContainerStyle}>
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
        to={transferSuccessDetails.to}
        amount={transferSuccessDetails.amount}
        note={transferSuccessDetails.note}
        referenceNo={transferSuccessDetails.ref}
        onClose={() => setShowTransferSuccess(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainerLight: {
    flex: 1,
    padding: Layout.content.padding,
    backgroundColor: Colors.background.light,
    gap: Layout.form.gap,
  },
  viewContainerDark: {
    flex: 1,
    padding: Layout.content.padding,
    backgroundColor: Colors.background.dark,
    gap: Layout.form.gap,
  },
});
