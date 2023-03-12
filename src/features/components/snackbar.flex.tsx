import { Snackbar, Text } from "react-native-paper";

import { th } from "@src/helpers/theme";

declare type Props = {
  /** Show snack or not. Useful to state control on parent. */
  visible: boolean;

  /** The message to show */
  message: string;

  /** The text of the button to be show */
  actionLabel?: string;

  /** The timeout to fire the callback */
  timeout?: number;

  /** The callback to fire after duration */
  callback: () => void;
};

const DEFAULT_TIMEOUT = 4000;

export const SnackbarFlex = (props: Props) => {
  /** Fix and set timeout to default if necessary */
  let fixedTimeout = props.timeout ? Math.abs(props.timeout) : DEFAULT_TIMEOUT;

  /** If props has an action label and no timeout, set timeout to infinite
   * to wait for the button press */
  if (props.actionLabel && !props.timeout) fixedTimeout = Number.MAX_VALUE;

  if (props.actionLabel) {
    return (
      <Snackbar
        style={{ backgroundColor: th.colors.backdrop }}
        visible={props.visible}
        duration={fixedTimeout}
        onDismiss={props.callback}
        action={{
          label: props.actionLabel,
          onPress: props.callback,
        }}>
        <Text>{props.message}</Text>
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        style={{ backgroundColor: th.colors.backdrop }}
        visible={props.visible}
        duration={fixedTimeout}
        onDismiss={props.callback}>
        <Text>{props.message}</Text>
      </Snackbar>
    );
  }
};
