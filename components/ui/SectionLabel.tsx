import { Text } from "react-native-ui-lib";

type Props = {
  label: string;
};

export function SectionLabel({ label }: Props) {
  return <Text text40>{label}</Text>;
}
