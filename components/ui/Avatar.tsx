import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-ui-lib";

const DIMENSION = 40;

export function Avatar() {
  const colorScheme = useColorScheme();

  const cardStyle = useMemo(() => {
    return colorScheme === "light" ? styles.cardLight : styles.cardDark;
  }, [colorScheme]);

  return (
    <Card width={DIMENSION} height={DIMENSION} style={cardStyle}>
      <Card.Section
        content={[
          {
            text: "RB",
            text60: true,
            color:
              colorScheme === "light" ? "#ffffff" : Colors.primary.brand.light,
          },
        ]}
        contentStyle={styles.cardContent}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  cardLight: {
    backgroundColor: Colors.primary.brand.light,
    marginRight: 10,
  },
  cardDark: {
    backgroundColor: Colors.primary.brand.dark,
    marginRight: 10,
  },
  cardContent: {
    color: "purple",
    height: DIMENSION,
    alignSelf: "center",
    justifyContent: "center",
  },
});
