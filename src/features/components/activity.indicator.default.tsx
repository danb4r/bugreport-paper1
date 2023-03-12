import { View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { th } from "@src/helpers/theme";

declare type Props = {
  /** Message to show bellow the indicator */
  message?: string;
};

export const ActivityIndicatorDefault = (props: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: th.colors.background }}>
      <ActivityIndicator animating={true} color={th.colors.theme_main} />
      {props.message ? (
        <Text style={{ paddingTop: 20, color: th.colors.theme_text_faded }}>{props.message}</Text>
      ) : null}
    </View>
  );
};
