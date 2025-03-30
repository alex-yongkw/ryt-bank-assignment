import { TransactionHistoryCard } from "@/components/TransactionHistoryCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { TransactionHistoryService } from "@/services/transaction-history";
import { TransferType } from "@/types";
import { formatCustomRelativeDate } from "@/utils/date-formatter";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

type TransactionHistory = {
  id: string;
  type: TransferType;
  name: string;
  amount: number;
  note: string;
  timestamp: string;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const viewContainerStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.viewContainerLight
      : styles.viewContainerDark;
  }, [colorScheme]);

  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistory[]
  >([]);

  // Get transaction history from DB
  const getTransactionHistory = useCallback(async () => {
    const transactionHistoryService =
      await TransactionHistoryService.getInstance();

    const result = await transactionHistoryService.getAll();

    setTransactionHistory(
      result.map((r) => ({
        id: r.id,
        type: r.transferType,
        name: r.userName,
        amount: r.amount,
        note: r.note,
        timestamp: formatCustomRelativeDate(r.createdOn),
      }))
    );
  }, []);

  useFocusEffect(
    // useCallback to prevent infinite loops
    useCallback(() => {
      getTransactionHistory();
    }, [])
  );

  return (
    <View style={viewContainerStyle}>
      <SectionLabel label="Transaction History" />
      <FlatList
        data={transactionHistory}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TransactionHistoryCard
              key={item.id}
              type={item.type}
              name={item.name}
              amount={item.amount}
              note={item.note}
              timestamp={item.timestamp}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainerLight: {
    padding: Layout.content.padding,
    backgroundColor: Colors.background.light,
  },
  viewContainerDark: {
    padding: Layout.content.padding,
    backgroundColor: Colors.background.dark,
  },
  listItem: {
    marginBottom: Layout.transactionHistory.gap,
  },
  listContainer: {
    marginTop: Layout.transactionHistory.gap,
    marginBottom: Layout.transactionHistory.gap,
  },
});
