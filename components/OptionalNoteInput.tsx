import { TextField, View } from "react-native-ui-lib";
import { InputLabel } from "./ui/InputLabel";
import { Store } from "@/store";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export function OptionalNoteInput() {
  const colorScheme = useColorScheme();

  const placeholderTextColor = useMemo(() => {
    return colorScheme === "light" ? Colors.text.light : Colors.text.dark;
  }, [colorScheme]);

  const textStyle = useMemo(() => {
    return colorScheme === "light" ? styles.textLight : styles.textDark;
  }, [colorScheme]);

  return (
    <View>
      <InputLabel label="Note (optional)" />
      <TextField
        placeholder="What's this for?"
        placeholderTextColor={placeholderTextColor}
        multiline
        numberOfLines={6}
        maxLength={200}
        showCharCounter
        showClearButton
        onClear={() => Store.transfer.note.value.reset()}
        onChangeText={(text) => Store.transfer.note.value.set(text)}
        style={textStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textLight: {
    fontSize: 16,
    color: Colors.text.light,
  },
  textDark: {
    fontSize: 16,
    color: Colors.text.dark,
  },
});
