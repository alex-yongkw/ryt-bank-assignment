import { Colors } from "@/constants/Colors";
import { Card } from "react-native-ui-lib";

const DIMENSION = 45;

export function Avatar() {
  return (
    <Card
      width={DIMENSION}
      height={DIMENSION}
      style={{ backgroundColor: Colors.brand, marginRight: 10 }}
    >
      <Card.Section
        content={[{ text: "RB", text50: true, white: true }]}
        contentStyle={{
          height: DIMENSION,
          alignSelf: "center",
          justifyContent: "center",
        }}
      />
    </Card>
  );
}
