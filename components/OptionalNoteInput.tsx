import { TextField, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";

export function OptionalNoteInput() {
  return (
    <View>
      <InputLabel label="Note (optional)" />
      <TextField
        placeholder="What's this for?"
        multiline
        numberOfLines={6}
        maxLength={200}
        showCharCounter
        onChangeText={(text) => console.log(text)}
      />
    </View>
  );
}
