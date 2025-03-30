import {
  Button,
  RadioButton,
  RadioGroup,
  Text,
  View,
} from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { PopupModal } from "./ui/PopupModal";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useEffect, useMemo, useState } from "react";
import { Store } from "@/store";
import { ApiSetting } from "@/types";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function SettingModal({ visible, onClose }: Props) {
  const colorScheme = useColorScheme();
  const [selectedApiSetting, setSelectedApiSetting] =
    useState<ApiSetting>("success");

  const labelStyle = useMemo(() => {
    return colorScheme === "light" ? styles.labelLight : styles.labelDark;
  }, [colorScheme]);

  // subscribe to value change
  useEffect(() => {
    const unsubscribe = Store.apiSettings.value.subscribe((newVal) => {
      setSelectedApiSetting(newVal as ApiSetting);
    });

    return unsubscribe;
  }, []);

  return (
    <PopupModal visible={visible}>
      <Text text70 style={labelStyle} marginB-16>
        Mock API Settings
      </Text>
      <View>
        <RadioGroup
          initialValue={selectedApiSetting}
          // TODO -- Fix type
          onValueChange={(setting) => {
            Store.apiSettings.value.set(setting);
          }}
        >
          <RadioButton
            value={"success"}
            label={"Success"}
            labelStyle={labelStyle}
          />
          <RadioButton
            value={"insufficientFund"}
            label={"Insufficient Funds"}
            labelStyle={labelStyle}
            marginT-10
          />
          <RadioButton
            value={"networkError"}
            label={"Network Error"}
            labelStyle={labelStyle}
            marginT-10
          />
          <RadioButton
            value={"unknownError"}
            label={"Unknown Error"}
            labelStyle={labelStyle}
            marginT-10
          />
        </RadioGroup>
      </View>
      <Button
        label="Close"
        outline
        outlineColor={
          colorScheme === "light"
            ? Colors.primary.brand.light
            : Colors.primary.brand.dark
        }
        outlineWidth={2}
        size={Button.sizes.large}
        borderRadius={Layout.actionButton.borderRadius}
        onPress={onClose}
        marginT-20
      />
    </PopupModal>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  labelLight: {
    color: Colors.text.light,
  },
  labelDark: {
    color: Colors.text.dark,
  },
});
