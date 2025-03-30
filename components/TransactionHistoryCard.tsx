import { TransferType } from "@/types";
import { StyleSheet } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { TransferAmount } from "./ui/TransferAmount";
import { TransferTypeIcon } from "./ui/TransferTypeIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { Store } from "@/store";

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
  const router = useRouter();
  const colorScheme = useColorScheme();

  const cardStyle = useMemo(() => {
    return colorScheme === "light" ? styles.cardLight : styles.cardDark;
  }, [colorScheme]);

  const nameStyle = useMemo(() => {
    return colorScheme === "light" ? styles.nameLight : styles.nameDark;
  }, [colorScheme]);

  const noteStyle = useMemo(() => {
    return colorScheme === "light" ? styles.noteLight : styles.noteDark;
  }, [colorScheme]);

  const timestampStyle = useMemo(() => {
    return colorScheme === "light"
      ? styles.timestampLight
      : styles.timestampDark;
  }, [colorScheme]);

  return (
    <Card
      onPress={() => {
        Store.transfer.recipient.value.set(name);
        router.navigate("/(tabs)");
      }}
      style={cardStyle}
    >
      <View row centerV>
        <TransferTypeIcon type={type} />
        <View style={styles.details}>
          <Text text70BO numberOfLines={1} style={nameStyle}>
            {name}
          </Text>
          <Text text80 numberOfLines={1} style={noteStyle}>
            {note}
          </Text>
          <Text text80 style={timestampStyle}>
            {timestamp}
          </Text>
        </View>
        <TransferAmount type={type} amount={amount} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardLight: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 10,
    backgroundColor: Colors.card.light,
  },
  cardDark: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: Colors.border.dark,
    borderRadius: 10,
    backgroundColor: Colors.card.dark,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    marginRight: 14,
  },
  nameLight: {
    color: Colors.text.light,
  },
  nameDark: {
    color: Colors.text.dark,
  },
  noteLight: {
    color: Colors.text.light,
    opacity: 0.8,
    marginBottom: -2,
  },
  noteDark: {
    color: Colors.text.dark,
    opacity: 0.8,
    marginBottom: -2,
  },
  timestampLight: {
    color: Colors.text.light,
    opacity: 0.65,
  },
  timestampDark: {
    color: Colors.text.dark,
    opacity: 0.65,
  },
});
