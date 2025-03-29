import { FlatList, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import { Layout } from "@/constants/Layout";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Colors } from "@/constants/Colors";
import { TransferType } from "@/types";
import { TransactionHistoryCard } from "@/components/TransactionHistoryCard";

type TransactionHistory = {
  id: string;
  type: TransferType;
  name: string;
  amount: number;
  note: string;
  timestamp: string;
};

const transactionHistory: TransactionHistory[] = [
  {
    id: "001",
    type: "in",
    name: "user001",
    amount: 20,
    note: "some notes",
    timestamp: "Today, 2:30 PM",
  },
  {
    id: "002",
    type: "out",
    name: "user002",
    amount: 56.01,
    note: "asdwa asd wa sd asd wda sda wadafdgr ga ssad wa",
    timestamp: "Yesterday, 10:15 AM",
  },
  {
    id: "003",
    type: "in",
    name: "user003",
    amount: 40,
    note: "some notes",
    timestamp: "Mar 25, 4:45 PM",
  },
  {
    id: "004",
    type: "in",
    name: "user004",
    amount: 59,
    note: "some notes",
    timestamp: "Mar 25, 4:45 PM",
  },
  {
    id: "005",
    type: "in",
    name: "user005",
    amount: 20,
    note: "some notes",
    timestamp: "Mar 25, 4:45 PM",
  },
  {
    id: "006",
    type: "out",
    name: "user006",
    amount: 20,
    note: "some notes",
    timestamp: "Mar 25, 4:45 PM",
  },
  {
    id: "007",
    type: "out",
    name: "user007",
    amount: 200.5,
    note: "some notes",
    timestamp: "Mar 25, 4:45 PM",
  },
  {
    id: "008",
    type: "in",
    name: "user008",
    amount: 15,
    note: "some notes",
    timestamp: "Mar 26, 4:45 PM",
  },
  {
    id: "009",
    type: "in",
    name: "user001",
    amount: 2.2,
    note: "some notes",
    timestamp: "Mar 20, 4:45 PM",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.viewContainer}>
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
  viewContainer: {
    padding: Layout.content.padding,
    backgroundColor: Colors.light.background,
  },
  listItem: {
    marginBottom: Layout.transactionHistory.gap,
  },
  listContainer: {
    marginTop: Layout.transactionHistory.gap,
    marginBottom: Layout.transactionHistory.gap,
  },
});
