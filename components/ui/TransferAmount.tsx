import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native-ui-lib";
import { useMemo } from "react";
import { formatCurency } from "@/utils/number-formatter";
import { TransferType } from "@/types";

type Props = {
  type: TransferType;
  amount: number;
};

export function TransferAmount({ type, amount }: Props) {
  const color = useMemo(
    () => (type === "in" ? Colors.utility.green : Colors.utility.red),
    [type]
  );

  const formattedAmount = useMemo(() => {
    return type === "in"
      ? `+ MYR ${formatCurency(amount)}`
      : `- MYR ${formatCurency(amount)}`;
  }, [type]);

  return (
    <View>
      <Text text70BO color={color}>
        {formattedAmount}
      </Text>
    </View>
  );
}
