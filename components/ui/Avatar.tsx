import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Card } from "react-native-ui-lib";

const DIMENSION = 40;

export function Avatar() {
  return (
    <Card width={DIMENSION} height={DIMENSION} style={styles.card}>
      <Card.Section
        content={[{ text: "RB", text60: true, white: true }]}
        contentStyle={styles.cardContent}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.brand,
    marginRight: 10,
  },
  cardContent: {
    height: DIMENSION,
    alignSelf: "center",
    justifyContent: "center",
  },
});
