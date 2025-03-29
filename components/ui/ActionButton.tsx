import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Button } from "react-native-ui-lib";

type Props = {
  label: string;
  onPress: () => void;
};

export function ActionButton({ label, onPress }: Props) {
  return (
    <Button
      label={label}
      size={Button.sizes.large}
      backgroundColor={Colors.brand}
      borderRadius={Layout.actionButton.borderRadius}
      onPress={onPress}
    />
  );
}
