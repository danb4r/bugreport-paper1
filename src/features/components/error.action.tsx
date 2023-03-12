import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useApp } from "@src/providers/app";
import { th } from "@src/helpers/theme";
import { t } from "@src/helpers/i18n";

declare type Props = {
  /** Message to show bellow the indicator */
  message?: string;
  icon: string;
  buttonOnPress: () => void;
};

export const ErrorAction = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: th.colors.background,
      }}>
      {props.message ? (
        <Text style={{ paddingVertical: 20, color: th.colors.theme_text_faded }}>{props.message}</Text>
      ) : null}
      <Button icon={props.icon} mode="contained" onPress={props.buttonOnPress}>
        {t("app_reload")}
      </Button>
    </View>
  );
};
