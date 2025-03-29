import { TextField, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";

import { Store } from "@/store";

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
        showClearButton
        onClear={() => Store.transfer.resetNote()}
        onChangeText={(text) => Store.transfer.setNote(text)}
      />
    </View>
  );
}
