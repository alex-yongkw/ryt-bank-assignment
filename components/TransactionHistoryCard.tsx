import { Card, Text, View } from "react-native-ui-lib";
import { TransferTypeIcon } from "./ui/TransferTypeIcon";
import { TransferType } from "@/types";
import { TransferAmount } from "./ui/TransferAmount";
import { StyleSheet } from "react-native";

type Props = {
  type: TransferType;
  name: string;
  amount: number;
  note?: string;
  timestamp: string;
};

export function TransactionHistoryCard({
  type,
  name,
  amount,
  note,
  timestamp,
}: Props) {
  return (
    <Card onPress={() => console.log("pressed")} style={styles.card}>
      <View row centerV>
        <TransferTypeIcon type={type} />
        <View style={styles.details}>
          <Text text70BO numberOfLines={1}>
            {name}
          </Text>
          <Text text80 numberOfLines={1} style={styles.note}>
            {note}
          </Text>
          <Text text80 style={styles.timestamp}>
            {timestamp}
          </Text>
        </View>
        <TransferAmount type={type} amount={amount} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  note: {
    opacity: 0.8,
    marginBottom: -2,
  },
  timestamp: {
    opacity: 0.65,
  },
});
