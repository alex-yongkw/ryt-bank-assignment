import { StyleSheet } from "react-native";
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
import { TransactionHistoryCard } from "@/components/TransactionHistoryCard";
import { useCallback } from "react";
import { Store } from "@/store";
import { ErrorMsg } from "@/constants/ErrorMsg";
import { exist } from "@/utils/check-error";

export default function TransferScreen() {
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
  const checkFormError = useCallback(() => {
    const accountError = Store.transfer.account.error.get();
    const recipientError = Store.transfer.recipient.error.get();
    const amountError = Store.transfer.amount.error.get();

    return exist(accountError) || exist(recipientError) || exist(amountError);
  }, []);

  const initiateFundTransfer = useCallback(() => {
    validateForm();

    const isError = checkFormError();

    if (!isError) {
      // Mock transfer API
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
      <TransactionHistoryCard
        type="out"
        name="Sarah"
        amount={520.9}
        note="Rent"
        timestamp="Yesterday, 10:15 AM"
      />
      <TransactionHistoryCard
        type="in"
        name="Connor"
        amount={20.4}
        note="asdwa asd wa sd asd wda sda wadafdgr ga ssad wa "
        timestamp="Yesterday, 12:15 AM"
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
